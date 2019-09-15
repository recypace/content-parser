import {
  AesCryptor,
  CryptoProvider,
  Errors,
  LogLevel,
} from '@ridi/parser-core';

import Book from './model/Book';
import EpubParser from './EpubParser';

export default {
  AesCryptor,
  CryptoProvider,
  EpubBook: Book,
  EpubParser,
  Errors,
  LogLevel,
};
