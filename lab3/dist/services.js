import { Library } from './library';
export class LibraryService {
    static addBook(book) {
        LibraryService.books.addItem(book);
    }
    static removeBook(book) {
        LibraryService.users.items.forEach((user) => {
            user.borrowedBooks = user.borrowedBooks.filter((b) => b.id !== book.id);
        });
        LibraryService.books.removeItem(book);
    }
    static removeUser(user) {
        user.borrowedBooks.forEach((book) => {
            book.borrowed = false;
        });
        LibraryService.users.removeItem(user);
    }
    static addUser(user) {
        LibraryService.users.addItem(user);
    }
    static borrowBook(user, book) {
        user.borrowBook(book);
    }
    static returnBook(book) {
        for (const user of LibraryService.users.items) {
            const hasBook = user.borrowedBooks.some((b) => {
                console.log(`b: ${b.id}`);
                console.log(`book: ${book.id}`);
                return b.id === book.id;
            });
            if (hasBook) {
                user.returnBook(book);
                return;
            }
        }
        throw new Error('Книжку ніхто не брав...');
    }
}
LibraryService.books = new Library();
LibraryService.users = new Library();
//# sourceMappingURL=services.js.map