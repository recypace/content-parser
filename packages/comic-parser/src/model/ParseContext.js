import Book from './Book';

/* istanbul ignore next */
class ParseContext {
  constructor() {
    this.options = undefined;
    this.entries = undefined;
    const rawBook = {};
    Object.keys(new Book()).forEach((key) => { rawBook[key] = undefined; });
    this.rawBook = rawBook;
  }
}

export default ParseContext;
