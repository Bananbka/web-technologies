const text: string = "hello!";

let num: number;
num = 5;

const theTruth: boolean = false;

let xenomorph: any = "im string";
xenomorph = 5;
xenomorph = true;

const numberArray: number[] = [4, 4, 7, 8];
const stringArray: string[] = ['a', 'b', 'c', 'd'];


console.log(`
variables:
    string: ${text}
    number: ${num}
    boolean: ${theTruth}
    xenomorph: ${xenomorph}
    numberArray: ${numberArray}
    stringArray: ${stringArray}
`)


