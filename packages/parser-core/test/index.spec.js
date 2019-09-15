import { assert } from 'chai';

import {
  /* ../src/AesCryptor */
  AesCryptor,
  /* ../src/CryptoProvider */
  CryptoProvider,
  /* ../src/Parser */
  Parser,
  /* ../src/Version */
  Version,
  /* ../src/Logger */
  Logger,
  LogLevel,
  /* ../src/bufferUtil */
  trim,
  trimEnd,
  trimStart,
  /* ../src/cacheFile */
  getCachePath,
  removeAllCacheFiles,
  removeCacheFile,
  readCacheFile,
  writeCacheFile,
  /* ../src/createCryptoStream */
  createCryptoStream,
  /* ../src/createSliceStream */
  createSliceStream,
  /* ../src/errors */
  Errors,
  createError,
  mustOverride,
  /* ../src/mergeObjects */
  mergeObjects,
  /* ../src/parseBool */
  parseBool,
  /* ../src/pathUtil */
  getPathes,
  safeDirname,
  safePath,
  safePathJoin,
  /* ../src/readEntries */
  readEntries,
  /* ../src/streamUtil */
  conditionally,
  /* ../src/stringContains */
  stringContains,
  /* ../src/typecheck */
  getType,
  isArray,
  isBool,
  isExists,
  isFunc,
  isObject,
  isString,
  isUrl,
  /* ../src/validateOptions */
  validateOptions,
  /* ../src/zipUtil */
  openZip,
} from '../src/index';

describe('parser-core', () => {
  it('Check imports', () => {
    /* ../src/AesCryptor */
    assert(AesCryptor.constructor !== undefined);
    assert(AesCryptor.Encoding !== undefined);
    assert(AesCryptor.Mode !== undefined);

    /* ../src/CryptoProvider */
    assert(CryptoProvider.constructor !== undefined);
    assert(CryptoProvider.Purpose !== undefined);

    /* ../src/Parser */
    assert(Parser.constructor !== undefined);
    assert(Parser.Action !== undefined);

    /* ../src/Version */
    assert(Version.constructor !== undefined);

    /* ../src/Logger */
    assert(Logger.constructor !== undefined);
    assert(LogLevel !== undefined);

    /* ../src/cacheFile */
    assert(getCachePath !== undefined);
    assert(removeAllCacheFiles !== undefined);
    assert(removeCacheFile !== undefined);
    assert(readCacheFile !== undefined);
    assert(writeCacheFile !== undefined);

    /* ../src/createCryptoStream */
    assert(createCryptoStream !== undefined);

    /* ../src/createSliceStream */
    assert(createSliceStream !== undefined);

    /* ../src/errors */
    assert(Errors !== undefined);
    assert(createError !== undefined);
    assert(mustOverride !== undefined);

    /* ../src/mergeObjects */
    assert(mergeObjects !== undefined);

    /* ../src/parseBool */
    assert(parseBool !== undefined);

    /* ../src/pathUtil */
    assert(getPathes !== undefined);
    assert(safeDirname !== undefined);
    assert(safePath !== undefined);
    assert(safePathJoin !== undefined);

    /* ../src/readEntries */
    assert(readEntries !== undefined);

    /* ../src/streamUtil */
    assert(conditionally !== undefined);

    /* ../src/stringContains */
    assert(stringContains !== undefined);

    /* ../src/typecheck */
    assert(getType !== undefined);
    assert(isArray !== undefined);
    assert(isBool !== undefined);
    assert(isExists !== undefined);
    assert(isFunc !== undefined);
    assert(isObject !== undefined);
    assert(isString !== undefined);
    assert(isUrl !== undefined);

    /* ../src/validateOptions */
    assert(validateOptions !== undefined);

    /* ../src/zipUtil */
    assert(openZip !== undefined);
  });
});
