export class Book {
    constructor(data) {
        this._id = data.id ?? Book.__lastId++;
        this._name = data.name;
        this._author = data.author;
        this._publishYear = data.publishYear;
        this._borrowed = data.borrowed ?? false;
    }
    get id() {
        return this._id;
    }
    get publishYear() {
        return this._publishYear;
    }
    set publishYear(value) {
        this._publishYear = value;
    }
    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
    }
    get author() {
        return this._author;
    }
    set author(value) {
        this._author = value;
    }
    get borrowed() {
        return this._borrowed;
    }
    set borrowed(value) {
        this._borrowed = value;
    }
    static get lastId() {
        return this.__lastId;
    }
    static set lastId(value) {
        this.__lastId = value;
    }
    borrow() {
        if (this.borrowed) {
            throw new Error(`${this.name} книга уже взята.`);
        }
        this.borrowed = true;
    }
    returnBook() {
        if (!this.borrowed) {
            throw new Error(`${this.name} книга не взята.`);
        }
        this.borrowed = false;
    }
    toString() {
        return `${this._name} (${this._publishYear})\n${this._author}`;
    }
}
Book.__lastId = 1;
export class User {
    constructor(data) {
        this._id = data.id ?? User.__lastId++;
        this._name = data.name;
        this._email = data.email;
        this._borrowedBooks = data.borrowedBooks ?? [];
    }
    get id() {
        return this._id;
    }
    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
    }
    get email() {
        return this._email;
    }
    set email(value) {
        this._email = value;
    }
    get borrowedBooks() {
        return this._borrowedBooks;
    }
    set borrowedBooks(value) {
        this._borrowedBooks = value;
    }
    static get lastId() {
        return this.__lastId;
    }
    static set lastId(value) {
        this.__lastId = value;
    }
    borrowBook(book) {
        if (this.borrowedBooks.length >= User.__bookLimit) {
            throw new Error(`${this.name} має забагато книг, нехай повертає!`);
        }
        book.borrow();
        this._borrowedBooks.push(book);
    }
    returnBook(book) {
        book.returnBook();
        this._borrowedBooks = this._borrowedBooks.filter(
            (_book) => _book.id !== book.id
        );
    }
    toString() {
        return `${this._name} (${this._email})\n${this._borrowedBooks}`;
    }
}
User.__lastId = 1;
User.__bookLimit = 4;
//# sourceMappingURL=models.js.map
