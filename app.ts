// using colon type shows explicit expected type
const add = (n1: number, n2: number, showResult: boolean, phrase: string) => {
  // console.log(typeof number1);
  let result = n1 + n2;
  if (showResult) {
    console.log(phrase + result);
  } else {
    return result;
  }
};

// number type
const number1 = 5;
const number2 = 2.8;
// boolean type
const printResult = true;
// string type
const resultPhrase = "Result is: ";

add(number1, number2, printResult, resultPhrase);

// object type

// const person: {
//   name: string;
//   age: number;
// } = {

const person = {
  name: "Sean",
  age: 30,
  hobbies: ['Sports', 'Cooking']
};

let favoriteActivities: string[];
favoriteActivities = ['Sports']

console.log(person.name);
