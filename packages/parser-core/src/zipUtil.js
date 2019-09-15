/* eslint-disable max-len */
import fs from 'fs-extra';
import path from 'path';
import StreamChopper from 'stream-chopper';
import unzipper from 'unzipper';

import CryptoProvider from './CryptoProvider';
import { trimEnd } from './bufferUtil';
import { createCryptoStream } from './createCryptoStream';
import { createSliceStream } from './createSliceStream';
import { safePathJoin } from './pathUtil';
import { conditionally } from './streamUtil';
import { isExists, isString } from './typecheck';

function find(entryPath) {
  return this.files.find(entry => entryPath === entry.path);
}

function _getBufferSize(cryptoProvider) {
  if (isExists(cryptoProvider)) {
    return cryptoProvider.bufferSize;
  }
  return undefined;
}

async function getFile(entry, options = {}) {
  const { encoding, end } = options;
  let file = await new Promise((resolve, reject) => {
    const totalSize = Math.min(end || Infinity, entry.uncompressedSize);
    const bufferSize = _getBufferSize(this.cryptoProvider);
    let data = Buffer.from([]);
    entry.stream() // is DuplexStream.
      .pipe(conditionally(isExists(bufferSize), new StreamChopper({ size: Math.min(bufferSize, entry.uncompressedSize) })))
      .pipe(conditionally(isExists(end), createSliceStream(0, end)))
      .pipe(conditionally(isExists(this.cryptoProvider), createCryptoStream(entry.path, totalSize, this.cryptoProvider, CryptoProvider.Purpose.READ_IN_ZIP)))
      .on('data', (chunk) => { data = Buffer.concat([data, chunk]); })
      .on('error', e => reject(e))
      .on('end', () => resolve(data));
  });
  if (isExists(encoding)) {
    file = trimEnd(file).toString(encoding);
  }
  return file;
}

async function extractAll(unzipPath, overwrite = true) {
  if (overwrite) {
    fs.removeSync(unzipPath);
  }
  fs.mkdirpSync(unzipPath);

  const flags = overwrite ? 'w' : 'wx';
  const writeFile = (entry, output) => {
    return new Promise((resolve, reject) => {
      const bufferSize = _getBufferSize(this.cryptoProvider);
      const writeStream = fs.createWriteStream(output, { encoding: 'binary', flags });
      const onError = (error) => {
        writeStream.end();
        reject(error);
      };
      writeStream.on('error', onError);
      writeStream.on('close', resolve);
      // Stream is DuplexStream.
      const stream = entry.stream()
        .pipe(conditionally(isExists(bufferSize), new StreamChopper({ size: Math.min(bufferSize, entry.uncompressedSize) })))
        .on('error', onError)
        .on('data', (chunk) => {
          /* istanbul ignore if */
          if (isExists(this.cryptoProvider)) {
            /* istanbul ignore next */
            chunk = this.cryptoProvider.run(chunk, entry.path, CryptoProvider.Purpose.WRITE);
          }
          writeStream.write(chunk);
        })
        .on('end', () => {
          setTimeout(() => {
            // Retain a reference to buffer so that it can't be GC'ed too soon.
            // Otherwise, EBADF occurs.
            // https://github.com/nodejs/node/blob/v10.15.0/lib/fs.js#L462
            stream; // eslint-disable-line no-unused-expressions
          }, 200);
          writeStream.end();
        });
    });
  };

  await this.files.reduce((prevPromise, entry) => {
    return prevPromise.then(async () => {
      const output = safePathJoin(unzipPath, entry.path);
      if (entry.path.split('/').length > 1) {
        const dir = path.dirname(output);
        if (!fs.existsSync(dir)) {
          fs.mkdirpSync(dir);
        }
      }
      if (!entry.path.endsWith('/')) {
        const error = await writeFile(entry, output);
        if (error) {
          throw error;
        }
      }
    });
  }, Promise.resolve());
}

export async function openZip(file, cryptoProvider, logger) {
  let open = unzipper.Open.file;
  if (!isString(file)) {
    open = unzipper.Open.buffer;
  }
  const zip = await open(file);
  zip.cryptoProvider = cryptoProvider;
  return {
    ...zip,
    find,
    getFile,
    extractAll,
    logger,
  };
}
