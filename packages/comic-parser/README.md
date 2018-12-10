# @ridi/comic-parser

> Common comic data parser for Ridibooks services

[![npm version](https://badge.fury.io/js/%40ridi%2Fcomic-parser.svg)](https://badge.fury.io/js/%40ridi%2Fcomic-parser)
[![Build Status](https://travis-ci.org/ridi/content-parser.svg?branch=master)](https://travis-ci.org/ridi/content-parser)
[![codecov](https://codecov.io/gh/ridi/content-parser/branch/master/graph/badge.svg)](https://codecov.io/gh/ridi/content-parser)

## Features

- [x] Single structure parsing
- [ ] Nested structure parsing
- [x] Unzip zip file when parsing with options
- [x] Read files
  - [x] Read image in base64 encoding
- [x] Encrypt and decrypt function when parsing or reading or unzipping
- [ ] Debug mode
- [ ] Environment
  - [x] Node 
  - [ ] CLI
  - [ ] Browser
- [ ] Online demo

## Install

```bash
npm install @ridi/comic-parser
```

## Usage

Basic:

```js
import { ComicParser } from '@ridi/comic-parser';
// or const { ComicParser } = require('@ridi/comic-parser');

const parser = new ComicParser('./foo/bar.zip' or './unzippedPath');
parser.parse(/* { parseOptions } */).then((items) => {
  parser.readItems(items/*, { readOptions } */).then((results) => {
    ...
  });
  ...
});
```

with [Cryptor](https://github.com/ridi/content-parser/blob/master/src/cryptor/Cryptor.js):

```js
import { CryptoProvider, Cryptor } from '@ridi/comic-parser';
// or const { CryptoProvider, Cryptor } = require('@ridi/comic-parser');

const { Status } = CryptoProvider;
const { Modes, Padding } = Cryptor;

class ContentCryptoProvider extends CryptoProvider {
  constructor(key) {
    super();
    this.cryptor = new Cryptor(Modes.ECB, { key, padding: Padding.PKCS7 });
  }

  // Encrypt all content when unzipping and decrypt it when read.
  run(data, filePath) {
    if (this.status === Status.UNZIP) {
      return this.encrypt(data);
    } else if (this.status === Status.READ) {
      return Buffer.from(this.decrypt(data));
    }
    return data;
  }

  encrypt(data, filePath) {
    return this.cryptor.encrypt(data);
  }

  decrypt(data, filePath) {
    return this.cryptor.decrypt(data);
  }
}

const cryptoProvider = new ContentCryptoProvider(key);
const parser = new ComicParser('./foo/bar.zip' or './unzippedPath', cryptoProvider);
```

## API

### parse(parseOptions)

Returns `Promise<Book>` with:

- [Book](#book): Instance with image path, size, etc.

Or throw exception.

#### [parseOptions](#parseOptions): `?object`

---

### readItem(item, readOptions)

Returns `string` or `Buffer` in `Promise` with:

- If `readOptions.base64` is `true`:

  - `string`

- Other:

  - `Buffer`

or throw exception.

#### item: [Item](#item)

#### [readOptions](#readOptions): `?object`

---

### readItems(items, readOptions)

Returns `string[]` or `Buffer[]` in `Promise` with:

- If `readOptions.base64` is `true`:

  - `string`

- Other:

  - `Buffer`

or throw exception.

#### items: [Item\[\]](#item)

#### [readOptions](#readOptions): `?object`

## Model

<a id="book"></a>

### [Book](./src/model/Book.js)

- items: *[Item](#item)[]*

<a id="item"></a>

### [Item](./src/model/Item.js)

- index: *?string*
- path: *?string*
- size: *?number*

<a id="parseOptions"></a>

## Parse Options

* [unzipPath](#unzipPath)
* [overwrite](#overwrite)
* [ext](#ext)

---

<a id="unzipPath"></a>

### unzipPath: *`?string`*

If specified, uncompress to that path.
> only using if input is Zip file.

**Default:** `undefined`

---

<a id="overwrite"></a>

### overwrite: *`boolean`*

If true, overwrite to [unzipPath](#unzipPath) when uncompress.
> only using if unzipPath specified.

**Default:** `true`

---

<a id="ext"></a>

### ext: *`string[]`*

File extension to allow when extracting lists.

**Default:** `['jpg', 'jpeg', 'png', 'bmp', 'gif']`

---

<a id="readOptions"></a>

## Read Options

* [base64](#base64)

---

<a id="base64"></a>

### base64: *`boolean`*

If false, reads image into a buffer.

**Default:** `false`

---