interface Animal {
    talk(): void;

    walk(): void;
}

class Cat implements Animal {
    private _name: string;
    private _stray: boolean;

    constructor(name: string, stray: boolean) {
        this._name = name;
        this._stray = stray;
    }

    talk(): void {
        console.log(`${this._name} is yapping.`);
    }

    walk(): void {
        console.log(`${this._name} is walking at ${this._stray ? "home" : "street"}.`);
    }

    get name(): string {
        return this._name;
    }

    set name(name: string) {
        this._name = name;
    }

    get stray(): boolean {
        return this._stray;
    }

    set stray(value: boolean) {
        this._stray = value;
    }
}

class Bird implements Animal {
    private _specieName: string;
    private _maxHeight: number;

    constructor(speciesName: string, maxHeight: number) {
        this._maxHeight = maxHeight;
        this._specieName = speciesName;
    }

    walk(): void {
        console.log(`${this._specieName} is flying at ${this._maxHeight} height.`);
    }

    talk(): void {
        console.log(`${this._specieName} is singing.`);
    }

    set specieName(specieName: string) {
        this._specieName = specieName;
    }

    get speciesName() {
        return this._specieName;
    }

    set maxHeight(maxHeight: number) {
        this._maxHeight = maxHeight;
    }

    get maxHeight() {
        return this._maxHeight;
    }
}

class Fish implements Animal {
    private _livesInSaltyWater: boolean;
    private _maxDepth: number;

    constructor(livesInSaltyWater: boolean, maxDepth: number) {
        this._maxDepth = maxDepth;
        this._livesInSaltyWater = livesInSaltyWater;
    }

    walk(): void {
        console.log(`${this._livesInSaltyWater ? "Salty fish" : "Fish"} swimming at the depth of (${this._maxDepth})`);
    }

    talk(): void {
        console.log(`${this._livesInSaltyWater ? "Salty fish" : "fish"} doesn't make sounds.`)
    }

    get maxDepth(): number {
        return this._maxDepth;
    }

    set maxDepth(value: number) {
        this._maxDepth = value;
    }

    get livesInSaltyWater(): boolean {
        return this._livesInSaltyWater;
    }

    set livesInSaltyWater(value: boolean) {
        this._livesInSaltyWater = value;
    }
}


let animals: Animal[] = [
    new Cat("Bob", true),
    new Bird("Dove", 500),
    new Fish(true, 1500)
];

for (let animal of animals) {
    animal.talk();
    animal.walk();
}