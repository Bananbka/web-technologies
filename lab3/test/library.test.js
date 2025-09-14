const { expect } = require('chai');
const { Library } = require('../src/library');
const { Book } = require('../src/models');

describe('Library', function() {
    let lib;
    let book1;
    let book2;

    beforeEach(function() {
        lib = new Library();
        book1 = new Book({ name: 'Book1', author: 'Author1', publishYear: 2020 });
        book2 = new Book({ name: 'Book2', author: 'Author2', publishYear: 2021 });
    });

    it('Library should add item', function() {
        lib.addItem(book1);
        expect(lib.items).to.include(book1);
    });

    it('Library should not add duplicate item', function() {
        lib.addItem(book1);
        expect(() => lib.addItem(book1)).to.throw('Повторний айді: ' + book1.id);
    });

    it('Library should remove item', function() {
        lib.addItem(book1);
        lib.removeItem(book1);
        expect(lib.items).to.not.include(book1);
    });

    it('Library should throw error if removing non-existing item', function() {
        expect(() => lib.removeItem(book1)).to.throw('Річ ' + book1.id + ' не в спичку предметів.');
    });

    it('Library should find item by id', function() {
        lib.addItem(book2);
        expect(lib.getItem(book2.id)).to.equal(book2);
    });

    it('Library should check if item exists', function() {
        lib.addItem(book1);
        expect(lib.isItemExist(book1)).to.be.true;
        expect(lib.isItemExist(book2)).to.be.false;
    });
});
