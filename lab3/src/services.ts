import {Book, User} from './models';
import {Library} from './library';

export class LibraryService {
    static books = new Library<Book>();
    static users = new Library<User>();

    static addBook(book: Book) {
        LibraryService.books.addItem(book);
    }

    static removeBook(book: Book) {
        LibraryService.users.items.forEach(user => {
            user.borrowedBooks = user.borrowedBooks.filter(b => b.id !== book.id);
        });

        LibraryService.books.removeItem(book);
    }

    static removeUser(user: User) {
        user.borrowedBooks.forEach(book => {
            book.borrowed = false;
        });

        LibraryService.users.removeItem(user);
    }


    static addUser(user: User) {
        LibraryService.users.addItem(user);
    }

    static borrowBook(user: User, book: Book) {
        user.borrowBook(book);
    }

    static returnBook(book: Book) {
        for (const user of LibraryService.users.items) {
            const hasBook = user.borrowedBooks.some(
                (b: Book) => {
                    console.log(`b: ${b.id}`);
                    console.log(`book: ${book.id}`);
                    return b.id === book.id
                }
            );
            if (hasBook) {
                user.returnBook(book);
                return;
            }
        }
        throw new Error("Книжку ніхто не брав...")
    }
}
