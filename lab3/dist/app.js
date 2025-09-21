import { Book, User } from './models';
import { LibraryService } from './services';
import { Storage } from './storage';
import { Validation } from './validation';
import { Modal } from './modal';
import { Snackbar } from './toast';
import '../libs/bootstrap.css';
class App {
    constructor() {
        this.snackbar = new Snackbar();
        this.booksListEl = document.getElementById('books-list');
        this.usersListEl = document.getElementById('users-list');
        this.selectedBook = null;
        this.searchInput = document.getElementById('search-books');
        this.booksPerPage = 5;
        this.currentPage = 1;
        this.borrowModal = new Modal(
            'borrowModal',
            'confirmBorrow',
            'closeBorrowModal'
        );
        this.init();
    }
    init() {
        Storage.loadBooksData();
        Storage.loadUsersData();
        console.log(LibraryService.books.items);
        console.log(LibraryService.users.items);
        this.renderBooks();
        this.renderUsers();
        this.setupEventListeners();
    }
    setupEventListeners() {
        const addBookForm = document.getElementById('add-book-form');
        addBookForm?.addEventListener('submit', (e) => {
            e.preventDefault();
            if (!Validation.validateBookForm(addBookForm)) return;
            const formData = new FormData(addBookForm);
            const formObj = Object.fromEntries(formData.entries());
            const book = new Book({
                name: formObj.name,
                author: formObj.author,
                publishYear: Number(formObj.publishYear),
            });
            LibraryService.addBook(book);
            Storage.setBooksData();
            this.renderBooks();
        });
        const addUserForm = document.getElementById('add-user-form');
        addUserForm?.addEventListener('submit', (e) => {
            e.preventDefault();
            if (!Validation.validateUserForm(addUserForm)) return;
            const formData = new FormData(addUserForm);
            const formObj = Object.fromEntries(formData.entries());
            const user = new User(formObj);
            LibraryService.addUser(user);
            Storage.setUsersData();
            this.renderUsers();
        });
        const clearBtn = document.getElementById('clear-btn');
        clearBtn?.addEventListener('click', () => {
            Storage.clearStorage();
            this.snackbar.show('Сховище очищено.');
        });
        this.searchInput?.addEventListener('input', () => {
            this.currentPage = 1;
            this.renderBooks();
        });
    }
    renderBooks() {
        let books = LibraryService.books.items;
        const searchValue = this.searchInput?.value.toLowerCase() || '';
        if (searchValue) {
            books = books.filter(
                (book) =>
                    book.name.toLowerCase().includes(searchValue) ||
                    book.author.toLowerCase().includes(searchValue)
            );
        }
        const start = (this.currentPage - 1) * this.booksPerPage;
        const end = start + this.booksPerPage;
        const paginatedBooks = books.slice(start, end);
        this.booksListEl.innerHTML = '';
        paginatedBooks.forEach((book) => {
            const li = document.createElement('li');
            li.className =
                'list-group-item d-flex justify-content-between align-items-center fs-5';
            li.dataset.bookId = String(book.id);
            const textSpan = document.createElement('span');
            textSpan.textContent = `${book.name} (${book.publishYear}) - ${book.author}`;
            li.appendChild(textSpan);
            const badge = document.createElement('span');
            badge.className = `badge ${book.borrowed ? 'bg-danger' : 'bg-success'} rounded-pill mx-2`;
            badge.textContent = book.borrowed ? 'Заброньована' : 'Вільна';
            li.appendChild(badge);
            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'btn btn-sm btn-danger';
            deleteBtn.textContent = 'Видалити';
            deleteBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                LibraryService.removeBook(book);
                Storage.setBooksData();
                this.renderBooks();
            });
            li.appendChild(deleteBtn);
            li.style.cursor = 'pointer';
            if (!book.borrowed) {
                li.addEventListener('click', () => this.showBorrowModal(book));
            } else {
                li.addEventListener('click', () => {
                    try {
                        LibraryService.returnBook(book);
                        this.snackbar.show('Книжку повернуто');
                        this.renderBooks();
                        Storage.setBooksData();
                        Storage.setUsersData();
                    } catch (e) {
                        this.snackbar.show(e.message, 'danger');
                    }
                });
            }
            this.booksListEl.appendChild(li);
        });
        this.renderPagination(books.length);
    }
    renderPagination(totalBooks) {
        const paginationContainerId = 'books-pagination';
        let paginationContainer = document.getElementById(
            paginationContainerId
        );
        if (!paginationContainer) {
            paginationContainer = document.createElement('div');
            paginationContainer.id = paginationContainerId;
            paginationContainer.className =
                'd-flex justify-content-center mt-3';
            this.booksListEl.parentElement?.appendChild(paginationContainer);
        }
        paginationContainer.innerHTML = '';
        const totalPages = Math.ceil(totalBooks / this.booksPerPage);
        for (let i = 1; i <= totalPages; i++) {
            const btn = document.createElement('button');
            btn.className = `btn btn-sm btn-outline-primary mx-1 ${i === this.currentPage ? 'active' : ''}`;
            btn.textContent = String(i);
            btn.addEventListener('click', () => {
                this.currentPage = i;
                this.renderBooks();
            });
            paginationContainer.appendChild(btn);
        }
    }
    renderUsers() {
        const users = LibraryService.users.items;
        this.usersListEl.innerHTML = '';
        users.forEach((user) => {
            const li = document.createElement('li');
            li.className =
                'list-group-item d-flex justify-content-between align-items-center fs-5';
            li.dataset.userId = String(user.id);
            const textSpan = document.createElement('span');
            textSpan.textContent = `${user.id}: ${user.name} (${user.email})`;
            li.appendChild(textSpan);
            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'btn btn-sm btn-danger';
            deleteBtn.textContent = 'Видалити';
            deleteBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                LibraryService.removeUser(user);
                Storage.setUsersData();
                this.renderUsers();
            });
            li.appendChild(deleteBtn);
            this.usersListEl.appendChild(li);
        });
    }
    showBorrowModal(book) {
        this.selectedBook = book;
        this.borrowModal.show(() => {
            this.borrowBook();
        });
    }
    borrowBook() {
        const userIdInput = document.getElementById('userId');
        const userId = Number(userIdInput.value);
        const user = LibraryService.users.items.find((u) => u.id === userId);
        if (!user || !this.selectedBook) {
            userIdInput.classList.add('is-invalid');
            return;
        }
        try {
            LibraryService.borrowBook(user, this.selectedBook);
            Storage.setBooksData();
            Storage.setUsersData();
            userIdInput.value = '';
            userIdInput.classList.remove('is-invalid');
            this.renderBooks();
            this.renderUsers();
            this.snackbar.show('Книгу видано!');
            this.borrowModal.hide();
        } catch (err) {
            this.snackbar.show(err.message, 'danger');
        }
    }
}
document.addEventListener('DOMContentLoaded', () => {
    new App();
});
//# sourceMappingURL=app.js.map
