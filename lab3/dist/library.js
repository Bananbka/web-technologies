export class Library {
    constructor() {
        this._items = [];
    }
    get items() {
        return this._items;
    }
    set items(value) {
        this._items = value;
    }
    addItem(item) {
        if (this.isItemExist(item)) {
            throw new Error('Повторний айді: ' + item.id);
        }
        this._items.push(item);
    }
    removeItem(item) {
        if (!this.isItemExist(item)) {
            throw new Error(`Річ ${item.id} не в спичку предметів.`);
        }
        this._items = this._items.filter((_item) => _item.id !== item.id);
    }
    getItem(id) {
        return this._items.find((it) => it.id === id);
    }
    isItemExist(item) {
        return this._items.some((_item) => _item.id === item.id);
    }
}
//# sourceMappingURL=library.js.map
