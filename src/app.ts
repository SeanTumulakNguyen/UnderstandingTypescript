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
const merge = <T extends object, U extends object>(objA: T, objB: U) => {
  return Object.assign(objA, objB);
};

// console.log(merge({ name: "Max" }, { age: 30 }));
const mergedObj = merge({ name: "Max" }, { age: 30 });
console.log(mergedObj.age);

interface Lengthy {
  length: number;
}

const countAndPrint = <T extends Lengthy>(element: T): [T, string] => {
  let descriptionText = "Got no value.";
  if (element.length > 0) {
    descriptionText = "Got " + element.length + " elements.";
  }
  return [element, descriptionText];
};

console.log(countAndPrint("Hi there!"));

// keyof constraint
const extractAndConvert = <T extends object, U extends keyof T(obj: T, key: U) => {
  return  'Value: ' + obj[key];
};

extractAndConvert({ name: 'Max' }, 'name')

class DataStorage<T extends string | number | boolean> {
  private data: T[] = []

  addItem(item: T) {
    this.data.push(item)
  }

  removeItem(item: T) {
    if (this.data.indexOf(item) === -1) {
      return;
    }
    this.data.splice(this.data.indexOf(item), -1); // -1
  }

  getItems() {
    return [...this.data]
  }
}

const textStorage = new DataStorage<string>();
textStorage.addItem('Max')
textStorage.addItem('Manu')
textStorage.removeItem('Max')
console.log(textStorage.getItems())

const numberStorage = new DataStorage<number | string>();

// const objStorage = new DataStorage<object>();

// objStorage.addItem({name: 'Max'})
// objStorage.addItem({name: 'Manu'})
// // ...
// objStorage.removeItem({name: 'Max'})
// console.log(objStorage.getItems())