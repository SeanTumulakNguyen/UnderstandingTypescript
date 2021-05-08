"use strict";
// intersection types
const e1 = {
    name: "Max",
    priviledges: ["create-server"],
    startDate: new Date(),
};
// type guards
const AddGuard = (a, b) => {
    if (typeof a === "string" || typeof b === "string") {
        return a.toString() + b.toString();
    }
    return a + b;
};
const printEmployeeInformation = (emp) => {
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
    loadCargo(amount) {
        console.log("Loading cargo " + amount);
    }
}
const v1 = new Car();
const v2 = new Truck();
const useVehicle = (vehicle) => {
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
const moveAnimal = (animal) => {
    let speed;
    switch (animal.type) {
        case "bird":
            speed = animal.flyingSpeed;
            break;
        case "horse":
            speed = animal.runningSpeed;
            break;
    }
    console.log("Moving at speed " + speed);
};
moveAnimal({ type: "bird", flyingSpeed: 10 });
// type casting
// const userInputElement = <HTMLInputElement>document.getElementById("user-input")!;
const userInputElement = document.getElementById("user-input");
if (userInputElement) {
    userInputElement.value = "Hi there!";
}
const errorBag = {
    email: 'Not a valid email!'
};
