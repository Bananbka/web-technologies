abstract class Car {
    protected _type: string;
    protected _model: string;
    private _year: number;
    public color: string;

    protected constructor(type: string, model: string, year: number, color: string) {
        this._type = type;
        this._model = model;
        this._year = year;
        this.color = color;
    }

    get type(): string {
        return this._type;
    }

    get model(): string {
        return this._model;
    }

    get year(): number {
        return this._year;
    }

    set year(value: number) {
        if (value < 1886) throw new Error("Невірний рік виробництва.");
        this._year = value;
    }

    abstract showInfo(): void;
}


class Sedan extends Car {
    protected _seatCount: number;

    constructor(model: string, year: number, color: string, seatCount: number) {
        super("Sedan", model, year, color);
        this._seatCount = seatCount;
    }

    showInfo(): void {
        console.log(`Type: ${this.type} | Model: ${this.model} | Year: ${this.year} | Color: ${this.color}`);
        console.log(`Seats: ${this._seatCount}`);
    }
}

class SUV extends Car {
    protected _fourWheelDrive: boolean;

    constructor(model: string, year: number, color: string, fourWheelDrive: boolean) {
        super("SUV", model, year, color);
        this._fourWheelDrive = fourWheelDrive;
    }

    showInfo(): void {
        console.log(`Type: ${this.type} | Model: ${this.model} | Year: ${this.year} | Color: ${this.color}`);
        console.log(`4x4: ${this._fourWheelDrive ? "Yes" : "No"}`);
    }
}

class Electric extends Car {
    protected _batteryKWh: number;

    constructor(model: string, year: number, color: string, batteryKWh: number) {
        super("Electric", model, year, color);
        this._batteryKWh = batteryKWh;
    }

    showInfo(): void {
        console.log(`Type: ${this.type} | Model: ${this.model} | Year: ${this.year} | Color: ${this.color}`);
        console.log(`Battery: ${this._batteryKWh} kWh`);
    }
}


class ToyotaCamry extends Sedan {
    private _horsePower: number;

    constructor(year: number, color: string, seatCount: number, horsePower: number) {
        super("Camry", year, color, seatCount);
        this._horsePower = horsePower;
    }

    showInfo(): void {
        super.showInfo();
        console.log(`Brand specifics: Toyota Camry | Horsepower: ${this._horsePower}`);
    }
}

class BMW3Series extends Sedan {
    private _turbo: boolean;

    constructor(year: number, color: string, seatCount: number, turbo: boolean) {
        super("3 Series", year, color, seatCount);
        this._turbo = turbo;
    }

    showInfo(): void {
        super.showInfo();
        console.log(`Brand specifics: BMW 3 Series | Turbo: ${this._turbo ? "Yes" : "No"}`);
    }
}


class RangeRover extends SUV {
    private _luxuryPackage: boolean;

    constructor(year: number, color: string, fourWheelDrive: boolean, luxuryPackage: boolean) {
        super("Range Rover", year, color, fourWheelDrive);
        this._luxuryPackage = luxuryPackage;
    }

    showInfo(): void {
        super.showInfo();
        console.log(`Brand specifics: Range Rover | Luxury package: ${this._luxuryPackage ? "Included" : "No"}`);
    }
}

class JeepWrangler extends SUV {
    private _towingCapacityKg: number;

    constructor(year: number, color: string, fourWheelDrive: boolean, towingCapacityKg: number) {
        super("Wrangler", year, color, fourWheelDrive);
        this._towingCapacityKg = towingCapacityKg;
    }

    showInfo(): void {
        super.showInfo();
        console.log(`Brand specifics: Jeep Wrangler | Towing capacity: ${this._towingCapacityKg} kg`);
    }
}

class TeslaModelS extends Electric {
    private _autopilot: boolean;

    constructor(year: number, color: string, batteryKWh: number, autopilot: boolean) {
        super("Model S", year, color, batteryKWh);
        this._autopilot = autopilot;
    }

    showInfo(): void {
        super.showInfo();
        console.log(`Brand specifics: Tesla Model S | Autopilot: ${this._autopilot ? "Yes" : "No"}`);
    }
}

class NissanLeaf extends Electric {
    private _rangeKm: number;

    constructor(year: number, color: string, batteryKWh: number, rangeKm: number) {
        super("Leaf", year, color, batteryKWh);
        this._rangeKm = rangeKm;
    }

    showInfo(): void {
        super.showInfo();
        console.log(`Brand specifics: Nissan Leaf | Range: ${this._rangeKm} km`);
    }
}


const cars: Car[] = [
    new ToyotaCamry(2022, "Black", 5, 203),
    new BMW3Series(2021, "White", 5, true),
    new RangeRover(2023, "Grey", true, true),
    new JeepWrangler(2020, "Green", true, 2000),
    new TeslaModelS(2024, "Red", 100, true),
    new NissanLeaf(2019, "Blue", 40, 240),
];

for (const car of cars) {
    car.showInfo();
    console.log("------");
}
