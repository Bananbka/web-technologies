export class Library<T extends { id: number }> {
    private _items: T[];

    constructor() {
        this._items = [];
    }

    get items(): T[] {
        return this._items;
    }

    set items(value: T[]) {
        this._items = value;
    }

    addItem(item: T): void {
        if (this.isItemExist(item)) {
            throw new Error('Повторний айді: ' + item.id);
        }
        this._items.push(item);
    }

    removeItem(item: T): void {
        if (!this.isItemExist(item)) {
            throw new Error(`Річ ${item.id} не в спичку предметів.`);
        }
        this._items = this._items.filter((_item) => _item.id !== item.id);
    }

    getItem(id: number): T | undefined {
        return this._items.find((it) => it.id === id);
    }

    isItemExist(item: T): boolean {
        return this._items.some((_item: T) => _item.id === item.id);
    }
}
