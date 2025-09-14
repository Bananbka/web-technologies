const { expect } = require('chai');
const { JSDOM } = require('jsdom');
const { Validation } = require('../src/validation');

describe('Validation', function() {
    let dom;
    let form;

    beforeEach(function() {
        dom = new JSDOM(`
      <form>
        <input name="title" placeholder="Title" />
        <span class="feedback"></span>
        <input name="publishYear" placeholder="Year" />
        <span class="feedback"></span>
      </form>
    `);
        form = dom.window.document.querySelector('form');
    });

    it('Validation should fail empty fields', function() {
        const result = Validation.validateBookForm(form);
        expect(result).to.be.false;
        const feedbacks = form.querySelectorAll('span.feedback');
        feedbacks.forEach(fb => {
            expect(fb.textContent).to.not.equal('');
        });
    });

    it('Validation should fail invalid year', function() {
        const inputs = form.querySelectorAll('input');
        inputs[0].value = 'Book Title';
        inputs[1].value = '-2020';
        const result = Validation.validateBookForm(form);
        expect(result).to.be.false;
        expect(inputs[1].nextElementSibling.textContent).to.equal('Рік повинен бути додатнім числом');
    });

    it('Validation should pass valid form', function() {
        const inputs = form.querySelectorAll('input');
        inputs[0].value = 'Book Title';
        inputs[1].value = '2020';
        const result = Validation.validateBookForm(form);
        expect(result).to.be.true;
        const feedbacks = form.querySelectorAll('span.feedback');
        feedbacks.forEach(fb => expect(fb.textContent).to.equal(''));
    });
});
