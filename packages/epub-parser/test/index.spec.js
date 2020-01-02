import { assert } from 'chai';

import {
  AesCryptor,
  CryptoProvider,
  EpubBook,
  EpubParser,
  Errors,
  Hash,
  LogLevel,
} from '../src/index';

describe('epub-parser', () => {
  it('Check imports', () => {
    assert(AesCryptor.constructor !== null);
    assert(CryptoProvider.constructor !== null);
    assert(EpubBook.constructor !== null);
    assert(EpubParser.constructor !== null);
    assert(Errors !== null);
    assert(Hash !== null);
    assert(LogLevel !== null);
  });
});
