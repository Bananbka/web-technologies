"use strict";
const text = "hello!";
let num;
num = 5;
const theTruth = false;
let xenomorph = "im string";
xenomorph = 5;
xenomorph = true;
const numberArray = [4, 4, 7, 8];
const stringArray = ['a', 'b', 'c', 'd'];
console.log(`
variables:
    string: ${text}
    number: ${num}
    boolean: ${theTruth}
    xenomorph: ${xenomorph}
    numberArray: ${numberArray}
    stringArray: ${stringArray}
`);
