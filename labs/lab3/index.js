
function getElement(id) {
    return document.getElementById(id);
}


function task1() {
    let sum = 0;
    let num = 1;
    while (num <= 50) {
        sum += num;
        num++;
    }
    console.log(`Task 1: ${sum}`);
    let element = getElement("sum");
    element.innerText = sum;
    return sum;
}

function task2() {
    let resultElement = getElement("factorial");
    let input = getElement("factorial-input");
    let num =  input.value;
    let factorial = 1;
    if (num < 0) {
        factorial = -1;
    }
    else if (num == 0) {
        factorial = 1;
    }
    else {
        for (let i = 2; i <= num; i++) {
            factorial *= i;
        }
    }
    resultElement.innerText = factorial;
    console.log(`Task 2: ${factorial}`);
    return factorial;
}

function task3() {
    let resultElement = getElement("month");
    let input = getElement("month-input");
    let num = input.value;
    let month = '';
    switch (Number(num)) {
        case 1:
            month = 'January';
            break;
        case 2:
            month = 'February';
            break;
        case 3:
            month = 'March';
            break;
        case 4:
            month = 'April';
            break;
        case 5:
            month = 'May';
            break;
        case 6:
            month = 'June';
            break;
        case 7:
            month = 'July';
            break;
        case 8:
            month = 'August';
            break;
        case 9:
            month = 'September';
            break;
        case 10:
            month = 'October';
            break;
        case 11:
            month = 'November';
            break;
        case 12:
            month = 'December';
            break;
        default:
            month = 'Error';
    }
    resultElement.innerText = month;
    console.log(`Task 3: ${month}`);
    return month;
}

function sumEven(array) {
    let sum = 0;
    for (let i of array) {
        sum += i%2===0 ? i : 0;
    }
    return sum;
}
function task4() {
    let resultElement = getElement("even");
    let conditionElement = getElement("even-array");
    let array = [1, 2, 3, 4, 6, 11];
    let sum = sumEven(array);
    conditionElement.innerText = `[${array.join(", ")}]`;
    resultElement.innerText = sum;
    console.log(`Task4: ${sum}`)
    return sum;
}

function task5() {
    let countVowel = (text) => {
        let vowel = ["a", "e", "i", "o", "u"];
        text.toLowerCase();
        let count = 0;
        for (let i = 0; i < text.length; i++) {
            if (vowel.includes(text[i])) { count++; }
        }
        return count;
    }

    let resultElement = getElement("vowel");
    let input = getElement("vowel-input");
    let text = input.value;
    let result = countVowel(text);
    resultElement.innerText = result;
    console.log(`Task4: ${result}`);
    return result;
}

function pow(base, exponent) {
    let result = 1;
    if (exponent < 0) {
        result = "Error";
    } else {
        for (let i = 1; i <= exponent; i++) {
            result *= base;
        }
    }
    return result;
}
function task6() {
    let resultElement = getElement("pow");
    let inputExponent = getElement("exponent-input");
    let inputBase = getElement("base-input");

    let base = inputBase.value;
    let exponent = inputExponent.value;
    let result = pow(base, exponent);
    resultElement.innerText = result;

    return result;
}
