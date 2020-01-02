import { assert } from 'chai';

import {
  AesCryptor,
  ComicBook,
  ComicParser,
  CryptoProvider,
  Errors,
  Hash,
  LogLevel,
} from '../src/index';

describe('comic-parser', () => {
  it('Check imports', () => {
    assert(AesCryptor.constructor !== null);
    assert(ComicParser.constructor !== null);
    assert(ComicBook.constructor !== null);
    assert(CryptoProvider.constructor !== null);
    assert(Errors !== null);
    assert(Hash !== null);
    assert(LogLevel !== null);
  });
});
