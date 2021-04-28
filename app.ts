// Return types
const add = (n1: number, n2: number) => {
  return n1 + n2;
};

// Void types
// does not return content - no errors
// functions are not allowed to return undefined
// use void NEVER undefined when using a function that doesn't return a value
const printResult = (num: number): void => {
  console.log("Result: " + num);
};

printResult(add(5, 12));

// undefined is a valid type
// let someValue: undefined;

// Function types
// let combineValues: Function;
let combineValues: (a: number, b: number) => number;

combineValues = add;
// combineValues = 5;
combineValues = printResult;

console.log(combineValues(8, 8));
