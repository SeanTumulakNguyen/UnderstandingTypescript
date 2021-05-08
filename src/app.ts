// intersection types

// could use interface types and extending the interfaces down below as well
type Admin = {
  name: string;
  priviledges: string[];
};

type Employee = {
  name: string;
  startDate: Date;
};

// interface ElevatedEmployee extends Admin, Employee { }

type ElevatedEmployee = Admin & Employee;

const e1: ElevatedEmployee = {
  name: "Max",
  priviledges: ["create-server"],
  startDate: new Date(),
};

type CombinableIntersection = string | number;
type Numeric = number | boolean;

type Universal = CombinableIntersection & Numeric;

// type guards
// arrow functions not working correct, having to use ES5?
function addGuard(a: number, b: number): number;
function addGuard(a: string, b: string): string;
function addGuard(a: CombinableIntersection, b: CombinableIntersection) {
  if (typeof a === "string" || typeof b === "string") {
    return a.toString() + b.toString();
  }
  return a + b;
};

const resultGuard = addGuard("Max", "Schwarz");
resultGuard.split(" ");

const fetchedUserData = {
    id: 'u1',
    name: 'Max',
    job: { title: 'CEO', description: 'My own company'}
}

// optional chaining
console.log(fetchedUserData?.job?.title)

// nullish coalescing
const userInputNullish = null;
const storedData = userInputNullish ?? 'DEFAULT'
console.log(storedData)

// type UnknownEmployeee = Employee | Admin;

// const printEmployeeInformation = (emp: UnknownEmployeee) => {
//   console.log("Name: " + emp.name);
//   // using the 'in' keyword checks if string exists in emp
//   // javascript
//   if ("priviledges" in emp) {
//     console.log("Priviledges: " + emp.priviledges);
//   }

//   if ("startDate" in emp) {
//     console.log("Start Date: " + emp.startDate);
//   }
// };

// printEmployeeInformation({ name: "Manu", startDate: new Date() });

// // instance of type guard

// class Car {
//   drive() {
//     console.log("Driving a car...");
//   }
// }

// class Truck {
//   drive() {
//     console.log("Driving a truck...");
//   }

//   loadCargo(amount: number) {
//     console.log("Loading cargo " + amount);
//   }
// }

// type Vehicle = Car | Truck;

// const v1 = new Car();

// const v2 = new Truck();

// const useVehicle = (vehicle: Vehicle) => {
//   vehicle.drive();
//   // instanceof is part of javascript
//   // instanceof could not be used in interfaces because javascript does not compile interfaces
//   // this would only be able to be used with classes
//   if (vehicle instanceof Truck) {
//     vehicle.loadCargo(1000);
//   }
// };

// useVehicle(v1);

// useVehicle(v2);

// // descriminated union types
// interface Bird {
//   type: "bird";
//   flyingSpeed: number;
// }

// interface Horse {
//   type: "horse";
//   runningSpeed: number;
// }

// type Animal = Bird | Horse;

// const moveAnimal = (animal: Animal) => {
//   let speed;
//   switch (animal.type) {
//     case "bird":
//       speed = animal.flyingSpeed;
//       break;
//     case "horse":
//       speed = animal.runningSpeed;
//       break;
//   }
//   console.log("Moving at speed " + speed);
// };

// moveAnimal({ type: "bird", flyingSpeed: 10 });

// // type casting

// // const userInputElement = <HTMLInputElement>document.getElementById("user-input")!;
// const userInputElement = document.getElementById("user-input");

// if (userInputElement) {
//   (userInputElement as HTMLInputElement).value = "Hi there!";
// }

// interface ErrorContainer {
//   // { email: 'Not a valid email', username: 'Must start with a character'}
//   [prop: string]: string;

// }

// const errorBag: ErrorContainer = {
//     email: 'Not a valid email!',
//     username: 'Must start with a capital character!'
// }
