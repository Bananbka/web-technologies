export class Snackbar {
    constructor() {
        let existing = document.getElementById('snackbar-container');
        if (existing) {
            this.container = existing;
        } else {
            this.container = document.createElement('div');
            this.container.id = 'snackbar-container';
            document.body.appendChild(this.container);
            console.log(this.container);
        }
    }
    show(message, type = 'success', duration = 3000) {
        const toast = document.createElement('div');
        toast.className = `text-white fs-3 p-3 rounded ${type === 'success' ? 'bg-success' : 'bg-danger'}`;
        toast.textContent = message;
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.3s ease';
        this.container.appendChild(toast);
        requestAnimationFrame(() => {
            toast.style.opacity = '1';
        });
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.addEventListener('transitionend', () => toast.remove());
        }, duration);
    }
}
//# sourceMappingURL=toast.js.map
