"use strict";
// unknown type
let userInput;
let userNameTwo;
userInput = 5;
userInput = "Max";
if (typeof userInput === "string") {
    userNameTwo = userInput;
}
// never type
function generateError(message, code) {
    throw { message: message, errorCode: code };
}
const result = generateError("An error occured!", 500);
console.log(result);
