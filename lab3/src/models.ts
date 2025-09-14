export interface IBook {
    id: number;
    name: string;
    author: string;
    publishYear: number;
    borrowed: boolean;

    borrow(): void;

    returnBook(): void;

    toString(): string;
}

export class Book implements IBook {
    private static __lastId: number = 1;
    private readonly _id: number;
    private _name: string;
    private _author: string;
    private _publishYear: number;
    private _borrowed: boolean;

    constructor(data: {
        id?: number;
        name: string;
        author: string;
        publishYear: number;
        borrowed?: boolean;
    }) {
        this._id = data.id ?? Book.__lastId++;
        this._name = data.name;
        this._author = data.author;
        this._publishYear = data.publishYear;
        this._borrowed = data.borrowed ?? false;
    }

    get id(): number {
        return this._id;
    }

    get publishYear(): number {
        return this._publishYear;
    }

    set publishYear(value: number) {
        this._publishYear = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get author(): string {
        return this._author;
    }

    set author(value: string) {
        this._author = value;
    }

    get borrowed(): boolean {
        return this._borrowed;
    }

    set borrowed(value: boolean) {
        this._borrowed = value;
    }

    static get lastId(): number {
        return this.__lastId;
    }

    static set lastId(value: number) {
        this.__lastId = value;
    }

    borrow(): void {
        if (this.borrowed) {
            throw new Error(`${this.name} книга уже взята.`);
        }
        this.borrowed = true;
    }

    returnBook(): void {
        if (!this.borrowed) {
            throw new Error(`${this.name} книга не взята.`);
        }
        this.borrowed = false;
    }

    toString(): string {
        return `${this._name} (${this._publishYear})\n${this._author}`;
    }
}

export interface IUser {
    id: number;
    name: string;
    email: string;
    borrowedBooks: Book[];

    borrowBook(book: Book): void;

    returnBook(book: Book): void;

    toString(): string;
}

export class User implements IUser {
    private static __lastId: number = 1;
    static readonly __bookLimit: number = 4;
    private readonly _id: number;
    private _name: string;
    private _email: string;
    private _borrowedBooks: Book[];

    constructor(data: {
        id?: number;
        name: string;
        email: string;
        borrowedBooks?: Book[];
    }) {
        this._id = data.id ?? User.__lastId++;
        this._name = data.name;
        this._email = data.email;
        this._borrowedBooks = data.borrowedBooks ?? [];
    }

    get id(): number {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get email(): string {
        return this._email;
    }

    set email(value: string) {
        this._email = value;
    }

    get borrowedBooks(): Book[] {
        return this._borrowedBooks;
    }

    set borrowedBooks(value: Book[]) {
        this._borrowedBooks = value;
    }

    static get lastId(): number {
        return this.__lastId;
    }

    static set lastId(value: number) {
        this.__lastId = value;
    }

    borrowBook(book: Book): void {
        if (this.borrowedBooks.length >= User.__bookLimit) {
            throw new Error(`${this.name} має забагато книг, нехай повертає!`);
        }
        book.borrow();
        this._borrowedBooks.push(book);
    }

    returnBook(book: Book): void {
        book.returnBook();
        this._borrowedBooks = this._borrowedBooks.filter(
            (_book: Book) => _book.id !== book.id
        );
    }

    toString(): string {
        return `${this._name} (${this._email})\n${this._borrowedBooks}`;
    }
}
