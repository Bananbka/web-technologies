interface Shape {
    getArea(): number;

    getPerimeter(): number;

    scale(factor: number): void;
}

class Circle implements Shape {
    private _R: number;

    constructor(radius: number) {
        this._R = radius;
    }

    get R(): number {
        return this._R;
    }

    set R(radius: number) {
        this._R = radius;
    }

    getArea(): number {
        return Math.PI * Math.pow(2, this._R);
    }

    getPerimeter(): number {
        return 2 * Math.PI * this._R;
    }

    scale(factor: number): void {
        if (factor > 0) {
            this._R *= factor;
            return;
        }
        console.log("Factor should be > 0")
    }
}

class Rectangle implements Shape {
    private _w: number;
    private _h: number;

    constructor(w: number, h: number) {
        this._w = w;
        this._h = h;
    }

    get w(): number {
        return this._w;
    }

    set w(value: number) {
        this._w = value;
    }

    get h(): number {
        return this._h;
    }

    set h(value: number) {
        this._h = value;
    }

    getArea(): number {
        return this._w * this._h;
    }

    getPerimeter(): number {
        return 2*this._w * 2*this._h;
    }

    scale(factor: number): void {
        if (factor > 0) {
            this._w *= factor;
            this._h *= factor;
            return;
        }
        console.log("Factor should be > 0")
    }
}

class Triangle implements Shape {
    private _a: number;
    private _b: number;
    private _c: number;

    constructor(a: number, b: number, c: number) {
        if (!Triangle.isValid(a, b, c)) {
            throw new Error("This triangle cannot exist.");
        }
        this._a = a;
        this._b = b;
        this._c = c;
    }

    static isValid(a: number, b: number, c: number): boolean {
        return a + b > c && a + c > b && b + c > a;
    }

    get a(): number {
        return this._a;
    }
    set a(value: number) {
        if (!Triangle.isValid(value, this._b, this._c)) {
            throw new Error("Invalid a side size.");
        }
        this._a = value;
    }

    get b(): number {
        return this._b;
    }
    set b(value: number) {
        if (!Triangle.isValid(this._a, value, this._c)) {
            throw new Error("Invalid b side size.");
        }
        this._b = value;
    }

    get c(): number {
        return this._c;
    }
    set c(value: number) {
        if (!Triangle.isValid(this._a, this._b, value)) {
            throw new Error("Invalid c side size.");
        }
        this._c = value;
    }

    getPerimeter(): number {
        return this._a + this._b + this._c;
    }

    getArea(): number {
        const p = this.getPerimeter() / 2; // півпериметр
        return Math.sqrt(p * (p - this._a) * (p - this._b) * (p - this._c));
    }

    scale(factor: number): void {
        if (factor > 0) {
            this._a = factor;
            this._b = factor;
            this._c = factor;
            return;
        }
        console.log("Factor should be > 0")
    }
}


const shapes: Shape[] = [
    new Circle(5),
    new Rectangle(5, 5),
    new Triangle(3, 4, 5)
]


let overallArea: number = 0;
let overallPerimeter: number = 0;
for (const shape of shapes) {
    overallArea += shape.getArea();
    overallPerimeter += shape.getPerimeter();
}

console.log(`Overall shapes area: ${overallArea.toFixed(2)}`);
console.log(`Overall shapes perimeter: ${overallPerimeter.toFixed(2)}`);

shapes[1].scale(5);
overallArea = 0;
overallPerimeter = 0;
for (const shape of shapes) {
    overallArea += shape.getArea();
    overallPerimeter += shape.getPerimeter();
}

console.log("AFTER SCALING")
console.log(`Overall shapes area: ${overallArea.toFixed(2)}`);
console.log(`Overall shapes perimeter: ${overallPerimeter.toFixed(2)}`);