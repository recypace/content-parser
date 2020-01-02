import { assert } from 'chai';

import {
  AesCryptor,
  CryptoProvider,
  ComicBook,
  ComicParser,
  EpubBook,
  EpubParser,
  Errors,
  LogLevel,
  Hash,
  PdfBook,
  PdfParser,
} from '../src/index';

describe('content-parser', () => {
  it('Check imports', () => {
    assert(AesCryptor.constructor !== null);
    assert(ComicBook.constructor !== null);
    assert(ComicParser.constructor !== null);
    assert(CryptoProvider.constructor !== null);
    assert(EpubBook.constructor !== null);
    assert(EpubParser.constructor !== null);
    assert(Errors !== null);
    assert(Hash !== null);
    assert(LogLevel !== null);
    assert(PdfBook.constructor !== null);
    assert(PdfParser.constructor !== null);
  });
});
