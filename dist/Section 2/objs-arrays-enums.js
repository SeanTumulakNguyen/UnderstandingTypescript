"use strict";
// using colon type shows explicit expected type
const add = (n1, n2, showResult, phrase) => {
    // console.log(typeof number1);
    let result = n1 + n2;
    if (showResult) {
        console.log(phrase + result);
    }
    else {
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
// const person: {
//   name: string;
//   age: number;
//   hobbies: string[];
//   role: [number, string]
// } = {
//   name: "Sean",
//   age: 30,
//   hobbies: ['Sports', 'Cooking'],
//   role: [2, 'author']
// };
// const ADMIN = 0;
// const READ_ONLY = 1;
// const AUTHOR = 2;
var Role;
(function (Role) {
    Role[Role["ADMIN"] = 5] = "ADMIN";
    Role[Role["READ_ONLY"] = 6] = "READ_ONLY";
    Role[Role["AUTHOR"] = 7] = "AUTHOR";
})(Role || (Role = {}));
;
const person = {
    name: "Sean",
    age: 30,
    hobbies: ["Sports", "Cooking"],
    role: Role.ADMIN,
};
// person.role.push('admin')
// person.role[1] = 10
// person.role = [0, 'admin', 'user'] !! Fails because using more items in array than designated in tuple
let favoriteActivities;
favoriteActivities = ["Sports"];
console.log(person.name);
for (const hobby of person.hobbies) {
    console.log(hobby.toUpperCase());
    // console.log(hobby.map()) !!! ERROR because map doesn't exist on type string
}
// Tuples; fixed length array
// kind of like string array but using certain types such as number then string
// Enum
// enum {NEW, OLD}
if (person.role === Role.ADMIN) {
    console.log("is admin");
}
// any
// most flexible but don't use if possible
