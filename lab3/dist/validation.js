export class Validation {
    static validateBookForm(form) {
        let isValid = true;
        const inputs = Array.from(form.querySelectorAll('input'));
        inputs.forEach((input) => {
            const feedback = input.nextElementSibling;
            const value = input.value.trim();
            if (!value) {
                isValid = false;
                feedback.textContent = `${input.placeholder} не може бути порожнім`;
                feedback.style.display = 'block';
                input.classList.add('is-invalid');
                return;
            }
            if (input.name === 'publishYear') {
                const year = Number(value);
                if (isNaN(year) || !Number.isInteger(year) || year <= 0) {
                    isValid = false;
                    feedback.textContent = 'Рік повинен бути додатнім числом';
                    feedback.style.display = 'block';
                    input.classList.add('is-invalid');
                    return;
                }
            }
            feedback.textContent = '';
            feedback.style.display = 'none';
            input.classList.remove('is-invalid');
        });
        return isValid;
    }
    static validateUserForm(form) {
        let isValid = true;
        const inputs = Array.from(form.querySelectorAll('input'));
        inputs.forEach((input) => {
            const feedback = input.nextElementSibling;
            const value = input.value.trim();
            if (!value) {
                isValid = false;
                feedback.textContent = `${input.placeholder} не може бути порожнім`;
                feedback.style.display = 'block';
                input.classList.add('is-invalid');
                return;
            }
            feedback.textContent = '';
            feedback.style.display = 'none';
            input.classList.remove('is-invalid');
        });
        return isValid;
    }
}
//# sourceMappingURL=validation.js.map
