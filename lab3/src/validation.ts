export class Validation {
    static validateBookForm(form: HTMLFormElement): boolean {
        let isValid = true;

        const inputs = Array.from(
            form.querySelectorAll('input')
        ) as HTMLInputElement[];

        inputs.forEach((input) => {
            const feedback = input.nextElementSibling as HTMLElement;
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

    static validateUserForm(form: HTMLFormElement): boolean {
        let isValid = true;

        const inputs = Array.from(
            form.querySelectorAll('input')
        ) as HTMLInputElement[];

        inputs.forEach((input) => {
            const feedback = input.nextElementSibling as HTMLElement;
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
