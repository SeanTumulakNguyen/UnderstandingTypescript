"use strict";
// Code goes here
const userName = "Max";
// constants can't be changed
let age = 30;
age = 29;
// console.log(result)
if (age > 20) {
    let isOld = true;
}
// fails in typescipt and not javascript
// if using var, variable is able to seen globally
// console.log(isOld);
// let and const allows block scope
// arrow function
const addForLet = (a, b) => a + b;
console.log(addForLet(2, 5));
const printOutput = (output) => console.log(output);
printOutput(addForLet(5, 2));
const buttonPress = document.querySelector("button");
if (button) {
    // if no parameters, use have to use pair of empty parentheses
    button.addEventListener("click", (event) => {
        console.log(event);
    });
}
// default function parameters
// so that only one parameter is needed
const ticket = (a, b = 1) => a + b;
// order of parameters matter
printOutput(ticket(6));
