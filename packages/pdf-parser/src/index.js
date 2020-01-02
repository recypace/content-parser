import {
  AesCryptor,
  CryptoProvider,
  Errors,
  Hash,
  LogLevel,
} from '@ridi/parser-core';

import PdfParser from './PdfParser';
import Book from './model/Book';

export default {
  AesCryptor,
  CryptoProvider,
  Errors,
  Hash,
  LogLevel,
  PdfBook: Book,
  PdfParser,
};
