// generic type

const names: Array<string> = []; // string[]
// names[0].split(' ');

// promise type
const promise: Promise<string> = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("This is done!");
  }, 2000);
});

promise.then((data) => {
  data.split(" ");
});
