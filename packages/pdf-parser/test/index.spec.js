import { assert } from 'chai';

import {
  AesCryptor,
  CryptoProvider,
  Errors,
  LogLevel,
  PdfBook,
  PdfParser,
} from '../src/index';

describe('pdf-parser', () => {
  it('Check imports', () => {
    assert(AesCryptor.constructor !== null);
    assert(CryptoProvider.constructor !== null);
    assert(Errors !== null);
    assert(LogLevel !== null);
    assert(PdfBook.constructor !== null);
    assert(PdfParser.constructor !== null);
  });
});
