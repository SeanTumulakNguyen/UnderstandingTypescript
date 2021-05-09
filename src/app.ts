// generic type

// const names: Array<string> = []; // string[]
// names[0].split(' ');

// promise type
// const promise: Promise<string> = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve("This is done!");
//   }, 2000);
// });

// promise.then((data) => {
//   data.split(" ");
// });

// creating generic function
const merge = <T, U>(objA: T, objB: U) => {
  return Object.assign(objA, objB);
};

// console.log(merge({ name: "Max" }, { age: 30 }));
const mergedObj = merge({ name: "Max" }, { age: 30 });
console.log(mergedObj.age)
