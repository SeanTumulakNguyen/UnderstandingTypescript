"use strict";
// Code goes here
const userName = "Max";
// constants can't be changed
let age = 30;
age = 29;
const addForLet = (a, b) => {
    let result;
    result = a + b;
    return result;
};
// console.log(result)
if (age > 20) {
    let isOld = true;
}
// fails in typescipt and not javascript
// if using var, variable is able to seen globally
// console.log(isOld);
// let and const allows block scope
