// Return types
var add = function (n1, n2) {
    return n1 + n2;
};
// Void types
// does not return content - no errors
// functions are not allowed to return undefined
// use void NEVER undefined when using a function that doesn't return a value
var printResult = function (num) {
    console.log("Result: " + num);
};
printResult(add(5, 12));
// undefined is a valid type
// let someValue: undefined;
var combineValues;
combineValues = add;
console.log(combineValues(8, 8));
