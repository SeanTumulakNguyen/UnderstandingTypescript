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
const AddGuard = (a: CombinableIntersection, b: CombinableIntersection) => {
  if (typeof a === "string" || typeof b === "string") {
    return a.toString() + b.toString();
  }
  return a + b;
};

type UnknownEmployeee = Employee | Admin;

const printEmployeeInformation = (emp: UnknownEmployeee) => {
  console.log("Name: " + emp.name);
  // using the 'in' keyword checks if string exists in emp
  // javascript
  if ("priviledges" in emp) {
    console.log("Priviledges: " + emp.priviledges);
  }

  if ("startDate" in emp) {
    console.log("Start Date: " + emp.startDate);
  }
};

printEmployeeInformation({ name: "Manu", startDate: new Date() });

// instance of type guard

class Car {
  drive() {
    console.log("Driving...");
  }
}

class Truck {
  drive() {
    console.log("Driving a truck...");
  }

  loadCargo(amount: number) {
    console.log("Loading cargo " + amount);
  }
}

type Vehicle = Car | Truck;

const v1 = new Car();

const v2 = new Truck();

const useVehicle = (vehicle: Vehicle) => {
    vehicle.drive();
    // instanceof is part of javascript
    // instanceof could not be used in interfaces because javascript does not compile interfaces
    // this would only be able to be used with classes
  if (vehicle instanceof Truck) {
    vehicle.loadCargo(1000);
  }
};

useVehicle(v1);

useVehicle(v2);
