import {
  AesCryptor,
  CryptoProvider,
  Errors,
  LogLevel,
} from '@ridi/parser-core';

import PdfParser from './PdfParser';
import Book from './model/Book';

export default {
  AesCryptor,
  CryptoProvider,
  Errors,
  LogLevel,
  PdfBook: Book,
  PdfParser,
};
