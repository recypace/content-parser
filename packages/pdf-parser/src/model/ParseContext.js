import Book from './Book';

class ParseContext {
  constructor() {
    this.options = undefined;
    this.entries = undefined;
    this.document = undefined;
    this.worker = undefined;
    const rawBook = {};
    Object.keys(new Book()).forEach((key) => { rawBook[key] = undefined; });
    this.rawBook = rawBook;
  }
}

export default ParseContext;
