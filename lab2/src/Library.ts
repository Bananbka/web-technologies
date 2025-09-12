interface LibraryItem {
    name: string;
    author: string;
    isBorrowed: boolean;

    borrow(): void;
}


class Book implements LibraryItem {
    public name: string;
    public author: string;
    public pages: number;
    public isBorrowed: boolean;

    constructor(name: string, author: string, pages: number) {
        this.name = name;
        this.author = author;
        this.pages = pages;
        this.isBorrowed = false;
    }

    borrow(): void {
        if (!this.isBorrowed) {
            this.isBorrowed = true;
            console.log(`Book "${this.name}" has been borrowed`);
        } else {
            console.log(`Book "${this.name}" already is borrowed`);
        }
    }
}

class Magazine implements LibraryItem {
    public name: string;
    public author: string;
    public issueNumber: number;
    public isBorrowed: boolean;

    constructor(name: string, author: string, issueNumber: number) {
        this.name = name;
        this.author = author;
        this.issueNumber = issueNumber;
        this.isBorrowed = false;
    }

    borrow(): void {
        if (!this.isBorrowed) {
            this.isBorrowed = true;
            console.log(`Magazine "${this.name}" has been borrowed`);
        } else {
            console.log(`Magazine "${this.name}" already is borrowed`);
        }
    }
}

class DVD implements LibraryItem {
    public name: string;
    public author: string;
    public durationMinutes: number;
    public isBorrowed: boolean;

    constructor(name: string, author: string, durationMinutes: number) {
        this.name = name;
        this.author = author;
        this.durationMinutes = durationMinutes;
        this.isBorrowed = false;
    }

    borrow(): void {
        if (!this.isBorrowed) {
            this.isBorrowed = true;
            console.log(`DVD "${this.name}" has been borrowed`);
        } else {
            console.log(`DVD "${this.name}" already is borrowed`);
        }
    }
}


class Library {
    private items: LibraryItem[] = [];

    addItem(item: LibraryItem): void {
        this.items.push(item);
        console.log(`Element "${item.name}" has been added to Library`);
    }

    findItemByName(name: string): LibraryItem | undefined {
        return this.items.find(item => item.name === name);
    }

    listAvailableItems(): void {
        console.log("Available library elements:");
        for (const item of this.items) {
            if (!item.isBorrowed) {
                console.log(`- ${item.name} (${item.author})`);
            }
        }
        console.log("------");
    }
}


const library = new Library();


const book1 = new Book("TypeScript Handbook", "Anders Hejlsberg", 350);
const book2 = new Book("Clean Code", "Robert C. Martin", 464);
const magazine1 = new Magazine("National Geographic", "Various", 120);
const magazine2 = new Magazine("Science Monthly", "Editorial", 45);
const dvd1 = new DVD("Inception", "Christopher Nolan", 148);
const dvd2 = new DVD("The Matrix", "Wachowskis", 136);

library.addItem(book1);
library.addItem(book2);
library.addItem(magazine1);
library.addItem(magazine2);
library.addItem(dvd1);
library.addItem(dvd2);

book1.borrow();
dvd2.borrow();
magazine1.borrow();

library.listAvailableItems();

const search = library.findItemByName("Clean Code");
if (search) {
    console.log(`Found: ${search.name} (${search.author})`);
} else {
    console.log("Didn't find");
}
