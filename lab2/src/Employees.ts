interface Payable {
    pay(): void;
}


abstract class Employee {
    protected _name: string;
    protected _age: number;
    protected _salary: number;

    constructor(name: string, age: number, salary: number) {
        this._name = name;
        this._age = age;
        this._salary = salary;
    }

    get name(): string {
        return this._name;
    }

    get age(): number {
        return this._age;
    }

    get salary(): number {
        return this._salary;
    }

    set name(value: string) {
        this._name = value;
    }

    set age(value: number) {
        this._age = value;
    }

    set salary(value: number) {
        this._salary = value;
    }


    abstract getAnnualBonus(): number;
}


class Developer extends Employee implements Payable {
    getAnnualBonus(): number {
        return this._salary * 0.10;
    }

    pay(): void {
        console.log(`Developer ${this._name} is getting payed ${this._salary}`);
    }
}


class Manager extends Employee implements Payable {
    getAnnualBonus(): number {
        return this._salary * 0.20;
    }

    pay(): void {
        console.log(`Manager ${this._name} is getting payed ${this._salary}`);
    }
}


const employees: Employee[] = [
    new Developer("Ihor", 28, 5000),
    new Developer("Maksym", 32, 6000),
    new Manager("Victor", 40, 8000),
    new Manager("David", 45, 9000)
];


let totalAnnualBonus = 0;

for (const emp of employees) {
    totalAnnualBonus += emp.getAnnualBonus();
}

console.log("Загальна річна сума бонусів:", totalAnnualBonus);


for (const emp of employees) {
    if ("pay" in emp) {
        (emp as Payable).pay();
    }
}
