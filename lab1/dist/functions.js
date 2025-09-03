"use strict";
function howMuchApplesIHave(emotion, num = 1) {
    return `I have ${num} apple${num > 1 ? "s" : ""}! ${emotion}`;
}
const appleCount = parseInt(prompt("How much apples do you have?") || "0");
const emotionText = prompt("How do you feel about your apples?") || "";
console.log(howMuchApplesIHave(emotionText, appleCount));
console.log(howMuchApplesIHave(emotionText));
