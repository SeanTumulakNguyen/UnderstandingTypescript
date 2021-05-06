// Code goes here

const userName = "Max";
// constants can't be changed
// let age = 30;

// age = 29;

// // console.log(result)
// if (age > 20) {
//   let isOld = true;
// }

// fails in typescipt and not javascript
// if using var, variable is able to seen globally
// console.log(isOld);

// let and const allows block scope

// arrow function
const addForLet = (a: number, b: number) => a + b;

console.log(addForLet(2, 5));

const printOutput: (a: number | string) => void = (output) =>
  console.log(output);

printOutput(addForLet(5, 2));

const buttonPress = document.querySelector("button");

if (buttonPress) {
  // if no parameters, use have to use pair of empty parentheses
  buttonPress.addEventListener("click", (event) => {
    console.log(event);
  });
}

// default function parameters
// so that only one parameter is needed
const ticket = (a: number, b: number = 1) => a + b;
// order of parameters matter
printOutput(ticket(6));

const hobbies = ["Sports", "Cooking"];
const activeHobbies = ["Hiking"];

// using spread operator
activeHobbies.push(...hobbies);

const aPerson = {
  firstName: "Max",
  age: 30,
};

// pulling all the key pairs from aPerson
const copiedPerson = { ...aPerson };

// rest parameters
const addRest = (...numbers: number[]) => {
  // using reduce method
  // two parameters, the result and then the value
  // reduce does function on every item in array
  return numbers.reduce((curResult, curValue) => {
    return curResult + curValue;
  }, 0);
};

// can use tuples such as [number, number, number] to only take three parameters

const addRestNumbers = addRest(5, 10, 2, 3.7);
console.log(addRestNumbers);

// array and object destructuring

// array destructuring
const [hobby1, hobby2, ...remainingHobbies] = hobbies;

console.log(hobbies, hobby1, hobby2);

// object destructuring
const { firstName: userFirstName, age } = aPerson;

console.log(userFirstName);
