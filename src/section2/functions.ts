// Return types
const addNumbers = (n1: number, n2: number) => {
  return n1 + n2;
};

// Void types
// does not return content - no errors
// functions are not allowed to return undefined
// use void NEVER undefined when using a function that doesn't return a value
const printResultNumbers = (num: number): void => {
  console.log("Result: " + num);
};

printResultNumbers(addNumbers(5, 12));

// undefined is a valid type
// let someValue: undefined;

// Function types
// let combineValues: Function;
let combineValues: (a: number, b: number) => number;

combineValues = addNumbers;
// combineValues = 5;
// combineValues = printResult;

console.log(combineValues(8, 8));


// Function Types and CallBacks
const addAndHandle = (n1: number, n2: number, cb: (num: number) => void) => {
  const result = n1 + n2;
  cb(result);
};

addAndHandle(10, 20, (result) => {
  console.log(result);
});
