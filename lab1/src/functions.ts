function howMuchApplesIHave(emotion: string, num: number = 1): string {
    return `I have ${num} apple${num > 1 ? "s" : ""}! ${emotion}`;
}

const appleCount: number = parseInt(prompt("How much apples do you have?") || "0");
const emotionText: string = prompt("How do you feel about your apples?") || "";

console.log(howMuchApplesIHave(emotionText, appleCount));
console.log(howMuchApplesIHave(emotionText));
