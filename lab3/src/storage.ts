import {Book, User} from "./models";
import {LibraryService} from "./services";

export class Storage {
    static setUsersData(): void {
        const users: User[] = LibraryService.users.items;
        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("usersLastId", String(User.lastId));
    }


    static loadUsersData(): void {
        const rawUsers: string = localStorage.getItem("users") || "[]";
        const usersData: any[] = JSON.parse(rawUsers);

        LibraryService.users.items = usersData.map((u: any) => {
            const borrowedBooks = u._borrowedBooks || []
            u.borrowedBooks = borrowedBooks.map((b: any) => {
                b.id = b._id;
                b.name = b._name;
                b.author = b._author;
                b.publishYear = b._publishYear;
                b.borrowed = b._borrowed;
                return new Book(b)
            });
            u.name = u._name;
            u.email = u._email;
            return new User(u);
        });
        User.lastId = this.getLastUsersId();
    }


    static setBooksData(): void {
        const books: Book[] = LibraryService.books.items;
        localStorage.setItem("books", JSON.stringify(books));
        localStorage.setItem("booksLastId", String(Book.lastId));
    }

    static loadBooksData(): void {
        const rawBooks: string = localStorage.getItem("books") || "[]";
        const booksData: any[] = JSON.parse(rawBooks);

        LibraryService.books.items = booksData.map((b: any) => {
            b.id = b._id;
            b.name = b._name;
            b.author = b._author;
            b.publishYear = b._publishYear;
            b.borrowed = b._borrowed;
            return new Book(b)
        });
        Book.lastId = this.getLastBooksId();
    }

    static getLastBooksId(): number {
        return Number(localStorage.getItem("booksLastId") || "1")
    }

    static getLastUsersId(): number {
        return Number(localStorage.getItem("usersLastId") || "1")
    }

    static clearStorage(): void {
        localStorage.clear();
    }
}