export class Modal {
    private readonly modalEl: HTMLElement;
    private readonly confirmBtn?: HTMLElement;
    private onConfirmCallback?: () => void;

    constructor(modalId: string, confirmBtnId?: string, closeClassBtn?: string) {
        const el = document.getElementById(modalId);
        if (!el) throw new Error(`Modal with id "${modalId}" not found`);
        this.modalEl = el;

        if (confirmBtnId) {
            const btn = document.getElementById(confirmBtnId);
            if (!btn) throw new Error(`Confirm button with id "${confirmBtnId}" not found`);
            this.confirmBtn = btn;
        }

        if (closeClassBtn) {
            const btns: HTMLElement[] = Array.from(document.querySelectorAll(`.${closeClassBtn}`)) as HTMLElement[] || [];
            btns.forEach((el: HTMLElement) => {
                el.addEventListener('click', () => {
                    this.hide();
                })
            })
        }

        this.modalEl.addEventListener('click', (e) => {
            if ((e.target as HTMLElement) === this.modalEl) {
                this.hide();
            }
        });
    }

    show(onConfirm?: () => void) {
        this.onConfirmCallback = onConfirm;

        this.modalEl.style.display = 'block';
        this.modalEl.classList.add('show');

        if (this.confirmBtn && this.onConfirmCallback) {
            this.confirmBtn.onclick = () => {
                this.onConfirmCallback!();
            };
        }
    }

    hide() {
        this.modalEl.style.display = 'none';
        this.modalEl.classList.remove('show');
    }
}