export class Modal {
    constructor(modalId, confirmBtnId, closeClassBtn) {
        const el = document.getElementById(modalId);
        if (!el) throw new Error(`Modal with id "${modalId}" not found`);
        this.modalEl = el;
        if (confirmBtnId) {
            const btn = document.getElementById(confirmBtnId);
            if (!btn)
                throw new Error(
                    `Confirm button with id "${confirmBtnId}" not found`
                );
            this.confirmBtn = btn;
        }
        if (closeClassBtn) {
            const btns =
                Array.from(document.querySelectorAll(`.${closeClassBtn}`)) ||
                [];
            btns.forEach((el) => {
                el.addEventListener('click', () => {
                    this.hide();
                });
            });
        }
        this.modalEl.addEventListener('click', (e) => {
            if (e.target === this.modalEl) {
                this.hide();
            }
        });
    }
    show(onConfirm) {
        this.onConfirmCallback = onConfirm;
        this.modalEl.style.display = 'block';
        this.modalEl.classList.add('show');
        if (this.confirmBtn && this.onConfirmCallback) {
            this.confirmBtn.onclick = () => {
                this.onConfirmCallback();
            };
        }
    }
    hide() {
        this.modalEl.style.display = 'none';
        this.modalEl.classList.remove('show');
    }
}
//# sourceMappingURL=modal.js.map
