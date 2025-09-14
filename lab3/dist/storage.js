import { Book, User } from './models';
import { LibraryService } from './services';
export class Storage {
    static setUsersData() {
        const users = LibraryService.users.items;
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('usersLastId', String(User.lastId));
    }
    static loadUsersData() {
        const rawUsers = localStorage.getItem('users') || '[]';
        const usersData = JSON.parse(rawUsers);
        LibraryService.users.items = usersData.map((u) => {
            const borrowedBooks = u._borrowedBooks || [];
            u.borrowedBooks = borrowedBooks.map((b) => {
                b.id = b._id;
                b.name = b._name;
                b.author = b._author;
                b.publishYear = b._publishYear;
                b.borrowed = b._borrowed;
                return new Book(b);
            });
            u.name = u._name;
            u.email = u._email;
            return new User(u);
        });
        User.lastId = this.getLastUsersId();
    }
    static setBooksData() {
        const books = LibraryService.books.items;
        localStorage.setItem('books', JSON.stringify(books));
        localStorage.setItem('booksLastId', String(Book.lastId));
    }
    static loadBooksData() {
        const rawBooks = localStorage.getItem('books') || '[]';
        const booksData = JSON.parse(rawBooks);
        LibraryService.books.items = booksData.map((b) => {
            b.id = b._id;
            b.name = b._name;
            b.author = b._author;
            b.publishYear = b._publishYear;
            b.borrowed = b._borrowed;
            return new Book(b);
        });
        Book.lastId = this.getLastBooksId();
    }
    static getLastBooksId() {
        return Number(localStorage.getItem('booksLastId') || '1');
    }
    static getLastUsersId() {
        return Number(localStorage.getItem('usersLastId') || '1');
    }
    static clearStorage() {
        localStorage.clear();
    }
}
//# sourceMappingURL=storage.js.map