function getElement(id) {
    return document.getElementById(id);
}



function getMaxMin(array) {
    let min = array[0];
    let max = array[0];
    for (let i of array) {
        if (i < min) { min = i; }
        if (i > max) { max = i; }
    }
    return [min, max];
}
function task1_1() {
    let numArray = [-5, 2, 0, -1, 10, 9, 5];
    let array = getElement('array');
    array.innerHTML = `<br>Array: [${numArray.join(", ")}]`;

    let maxMin = getMaxMin(numArray);
    let minElement = maxMin[0];
    let maxElement = maxMin[1];

    let task = getElement('result-1-1');
    task.innerHTML = `<br>Max: ${maxElement}<br>Min: ${minElement}`;
}



function compareObjects(a, b) {
    if (Object.keys(a).length !== Object.keys(b).length) {
        return false;
    }
    for (let i in a) {
        if (a[i] !== b[i]) {
            return false;
        }
    }
    return true;
}
function task1_2() {
    let obj1 = {"char":'b', "num":6, "smth":"apple"};
    let obj2 = {"num":6, "char":'b'};
    let objects = getElement("objects");
    objects.innerHTML = `<br>${JSON.stringify(obj1)}<br>${JSON.stringify(obj2)}`;

    let compared = compareObjects(obj1, obj2);
    let result = getElement('result-1-2');
    result.innerHTML = `<br>${compared}`;
}


function isInRange(range, num) {
    return num >= range[0] && num <= range[1];
}
function task2_1() {
    let num = 90;
    let range = [50, 90];
    let rangeElement = getElement('range');
    rangeElement.innerHTML = `<br>${range.join("–")}, num=${num}`;

    let result = getElement('result-2-1');
    result.innerHTML = `<br>${isInRange(range, num)}`;
}



function task2_2() {
    let biboolean = true;
    let biboolElement = getElement('biboolean');
    biboolElement.innerHTML = `<br>Start value: ${biboolean}`;

    let text = `I love buns and it's <b>${biboolean}</b>. I hate cinnamon and it's <b>${!biboolean}</b>. Anime catgirls are not real and, sadly, it's <b>${biboolean}</b>.`;
    let result = getElement('result-2-2');
    result.innerHTML = `<br>${text}`;
}


function stringifyScore(score) {
    if (score < 0 || score > 100) { return 'Error'; }
    else if (score < 50) { return 'Fail.'; }
    else if (score < 70) { return 'Satisfactory!'; }
    else if (score < 90) { return 'Good!☼'; }
    else {return 'Excellent!☺'}
}
function task3_1() {
    let score = 85;
    let scoreElement = getElement("score");
    scoreElement.innerHTML = `<br>Score: ${score}`;

    let result = stringifyScore(score);
    let resultElement = getElement("result-3-1");
    resultElement.innerHTML = `<br>${result}`;
}


function getSeason(month) {
    let months = ["december", "january", "february",
        "march", "april", "may",
        "june", "july", "august",
        "september", "october", "november"];
    month = month.toLowerCase();
    let isValid = months.includes(month) ? true : false;
    console.log(isValid);

    if (isValid) {
        if (month === months[0]
            || month === months[1]
            || month === months[2]) {
            return 'Winter';
        }
        else if (month === months[3]
                || month === months[4]
                || month === months[5]) {
            return 'Spring';
        }
        else if (month === months[6]
                || month === months[7]
                || month === months[8]) {
            return 'Summer. IT\'S BEACH TIME';
        }
        else {
            return 'Fall';
        }
    }
    return 'Error'
}
function task3_2() {
    let month = "June";
    let montElement = getElement("month");
    montElement.innerHTML = `<br>It is ${month}!`;
    let result = getSeason("June");
    let resultElement = getElement("result-3-2");
    resultElement.innerHTML = `<br>${result}`;
}

task1_1();
task1_2();
task2_1();
task2_2();
task3_1();
task3_2()