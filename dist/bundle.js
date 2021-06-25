"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var App;
(function (App) {
    // Component Base Class
    class Component {
        constructor(templateId, hostElementId, insertAtStart, newElementId) {
            this.attach = (insertAtBeginning) => {
                this.hostElement.insertAdjacentElement(insertAtBeginning ? "afterbegin" : "beforeend", this.element);
            };
            this.templateElement = document.getElementById(templateId);
            this.hostElement = document.getElementById(hostElementId);
            const importedNode = document.importNode(this.templateElement.content, true);
            this.element = importedNode.firstElementChild;
            if (newElementId) {
                this.element.id = newElementId;
            }
            this.attach(insertAtStart);
        }
    }
    App.Component = Component;
})(App || (App = {}));
var App;
(function (App) {
    // autobind decorator
    App.autobind = (_, _2, descriptor) => {
        const originalMethod = descriptor.value;
        const adjDescriptor = {
            configurable: true,
            get() {
                const boundFn = originalMethod.bind(this);
                return boundFn;
            },
        };
        return adjDescriptor;
    };
})(App || (App = {}));
var App;
(function (App) {
    App.validate = (validatableInput) => {
        let isValid = true;
        if (validatableInput.required) {
            isValid = isValid && validatableInput.value.toString().trim().length !== 0;
        }
        if (validatableInput.minLength != null && typeof validatableInput.value === "string") {
            isValid = isValid && validatableInput.value.length >= validatableInput.minLength;
        }
        if (validatableInput.maxLength != null && typeof validatableInput.value === "string") {
            isValid = isValid && validatableInput.value.length <= validatableInput.maxLength;
        }
        if (validatableInput.min != null && typeof validatableInput.value === "number") {
            isValid = isValid && validatableInput.value >= validatableInput.min;
        }
        if (validatableInput.max != null && typeof validatableInput.value === "number") {
            isValid = isValid && validatableInput.value <= validatableInput.max;
        }
        return isValid;
    };
})(App || (App = {}));
var App;
(function (App) {
    class State {
        constructor() {
            this.listeners = [];
        }
        addListener(listenerFn) {
            this.listeners.push(listenerFn);
        }
    }
    class ProjectState extends State {
        constructor() {
            super();
            this.projects = [];
        }
        static getInstance() {
            if (this.instance) {
                return this.instance;
            }
            this.instance = new ProjectState();
            return this.instance;
        }
        addProject(title, description, numOfPeople) {
            const newProject = new App.Project(Math.random().toString(), title, description, numOfPeople, App.ProjectStatus.Active);
            this.projects.push(newProject);
            this.updateListeners();
        }
        moveProject(projectId, newStatus) {
            const project = this.projects.find((prj) => prj.id === projectId);
            if (project && project.status !== newStatus) {
                project.status = newStatus;
                this.updateListeners();
            }
        }
        updateListeners() {
            for (const listenerFn of this.listeners) {
                listenerFn(this.projects.slice());
            }
        }
    }
    App.ProjectState = ProjectState;
    App.projectState = ProjectState.getInstance();
})(App || (App = {}));
/// <reference path="base-component.ts" />
/// <reference path="../decorators/autobind.ts" />
/// <reference path="../util/validation.ts" />
/// <reference path="../state/project-state.ts" />
var App;
(function (App) {
    // Project Class
    class ProjectInput extends App.Component {
        constructor() {
            super("project-input", "app", true, "user-input");
            this.configure = () => {
                this.element.addEventListener("submit", this.submitHandler);
            };
            this.gatherUserInput = () => {
                const enteredTitle = this.titleInputElement.value;
                const enteredDescription = this.descriptionInputElement.value;
                const enteredPeople = this.peopleInputElement.value;
                const titleValidatable = {
                    value: enteredTitle,
                    required: true,
                };
                const descriptionValidatable = {
                    value: enteredDescription,
                    required: true,
                    minLength: 5,
                };
                const peopleValidatable = {
                    value: +enteredPeople,
                    required: true,
                    min: 1,
                    max: 5,
                };
                if (!App.validate(titleValidatable) || !App.validate(descriptionValidatable) || !App.validate(peopleValidatable)) {
                    alert("Invalid input, please try again!");
                    return;
                }
                else {
                    return [enteredTitle, enteredDescription, +enteredPeople];
                }
            };
            this.clearInputs = () => {
                (this.titleInputElement.value = ""), (this.descriptionInputElement.value = ""), (this.peopleInputElement.value = "");
            };
            this.titleInputElement = this.element.querySelector("#title");
            this.descriptionInputElement = this.element.querySelector("#description");
            this.peopleInputElement = this.element.querySelector("#people");
            this.configure();
        }
        renderContent() { }
        submitHandler(event) {
            event.preventDefault();
            const userInput = this.gatherUserInput();
            if (Array.isArray(userInput)) {
                const [title, desc, people] = userInput;
                App.projectState.addProject(title, desc, people);
                console.log(title, desc, people);
                this.clearInputs();
            }
        }
    }
    __decorate([
        App.autobind
    ], ProjectInput.prototype, "submitHandler", null);
    App.ProjectInput = ProjectInput;
})(App || (App = {}));
var App;
(function (App) {
    // Project Type
    let ProjectStatus;
    (function (ProjectStatus) {
        ProjectStatus[ProjectStatus["Active"] = 0] = "Active";
        ProjectStatus[ProjectStatus["Finished"] = 1] = "Finished";
    })(ProjectStatus = App.ProjectStatus || (App.ProjectStatus = {}));
    class Project {
        constructor(id, title, description, people, status) {
            this.id = id;
            this.title = title;
            this.description = description;
            this.people = people;
            this.status = status;
        }
    }
    App.Project = Project;
})(App || (App = {}));
/// <reference path="base-component.ts" />
/// <reference path="../decorators/autobind.ts" />
/// <reference path="../state/project-state.ts" />
/// <reference path="../models/project.ts" />
/// <reference path="../models/drag-drop.ts" />
var App;
(function (App) {
    // ProjectList Class
    class ProjectList extends App.Component {
        constructor(type) {
            super("project-list", "app", false, `${type}-projects`);
            this.type = type;
            this.configure = () => {
                this.element.addEventListener("dragover", this.dragOverHandler);
                this.element.addEventListener("dragleave", this.dragLeaveHandler);
                this.element.addEventListener("drop", this.dropHandler);
                App.projectState.addListener((projects) => {
                    const relevantProjects = projects.filter((prj) => {
                        if (this.type === "active") {
                            return prj.status === App.ProjectStatus.Active;
                        }
                        return prj.status === App.ProjectStatus.Finished;
                    });
                    this.assignedProjects = relevantProjects;
                    this.renderProjects();
                });
            };
            this.renderContent = () => {
                const listId = `${this.type}-projects-list`;
                this.element.querySelector("ul").id = listId;
                this.element.querySelector("h2").textContent = this.type.toUpperCase() + "PROJECTS";
            };
            this.assignedProjects = [];
            this.configure();
            this.renderContent();
        }
        dragOverHandler(event) {
            if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
                event.preventDefault();
                const listEl = this.element.querySelector("ul");
                listEl.classList.add("droppable");
            }
        }
        dropHandler(event) {
            const prjId = event.dataTransfer.getData("text/plain");
            App.projectState.moveProject(prjId, this.type === "active" ? App.ProjectStatus.Active : App.ProjectStatus.Finished);
        }
        dragLeaveHandler(_) {
            const listEl = this.element.querySelector("ul");
            listEl.classList.remove("droppable");
        }
        renderProjects() {
            const listEl = document.getElementById(`${this.type}-projects-list`);
            listEl.innerHTML = "";
            for (const prjItem of this.assignedProjects) {
                new App.ProjectItem(this.element.querySelector("ul").id, prjItem);
            }
        }
    }
    __decorate([
        App.autobind
    ], ProjectList.prototype, "dragOverHandler", null);
    __decorate([
        App.autobind
    ], ProjectList.prototype, "dropHandler", null);
    __decorate([
        App.autobind
    ], ProjectList.prototype, "dragLeaveHandler", null);
    App.ProjectList = ProjectList;
})(App || (App = {}));
/// <reference path="base-component.ts" />
/// <reference path="../decorators/autobind.ts" />
/// <reference path="../models/project.ts" />
/// <reference path="../models/drag-drop.ts" />
var App;
(function (App) {
    // Projectitem Class
    class ProjectItem extends App.Component {
        constructor(hostId, project) {
            super("single-project", hostId, false, project.id);
            this.project = project;
            this.configure();
            this.renderContent();
        }
        get persons() {
            if (this.project.people === 1) {
                return "1 person";
            }
            else {
                return `${this.project.people} persons`;
            }
        }
        dragStartHandler(event) {
            event.dataTransfer.setData("text/plain", this.project.id);
            event.dataTransfer.effectAllowed = "move";
        }
        dragEndHandler(_) {
            console.log("DragEnd");
        }
        configure() {
            this.element.addEventListener("dragstart", this.dragStartHandler);
            this.element.addEventListener("dragend", this.dragEndHandler);
        }
        renderContent() {
            this.element.querySelector("h2").textContent = this.project.title;
            this.element.querySelector("h3").textContent = this.persons + " assigned";
            this.element.querySelector("p").textContent = this.project.description;
        }
    }
    __decorate([
        App.autobind
    ], ProjectItem.prototype, "dragStartHandler", null);
    App.ProjectItem = ProjectItem;
})(App || (App = {}));
/// <reference path="components/project-input.ts" />
/// <reference path="components/project-list.ts" />
/// <reference path="components/project-item.ts" />
var App;
(function (App) {
    new App.ProjectInput();
    new App.ProjectList("active");
    new App.ProjectList("finished");
})(App || (App = {}));
// Return types
const addNumbers = (n1, n2) => {
    return n1 + n2;
};
// Void types
// does not return content - no errors
// functions are not allowed to return undefined
// use void NEVER undefined when using a function that doesn't return a value
const printResultNumbers = (num) => {
    console.log("Result: " + num);
};
printResultNumbers(addNumbers(5, 12));
// undefined is a valid type
// let someValue: undefined;
// Function types
// let combineValues: Function;
let combineValues;
combineValues = addNumbers;
// combineValues = 5;
// combineValues = printResult;
console.log(combineValues(8, 8));
// Function Types and CallBacks
const addAndHandle = (n1, n2, cb) => {
    const result = n1 + n2;
    cb(result);
};
addAndHandle(10, 20, (result) => {
    console.log(result);
});
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
// Union types
// const combine = (input1: number | string, input2: number | string) => {
//   let result;
//   if (typeof input1 === "number" && typeof input2 === "number") {
//     result = input1 + input2;
//   } else {
//     result = input1.toString() + input2.toString();
//   }
//   return result;
// };
// const combinedAges = combine(30, 26);
// console.log(combinedAges);
// const combinedNames = combine("Max", "Anna");
// console.log(combinedNames);
// Literal types
const combine = (input1, input2, resultConversion) => {
    let result;
    if (typeof input1 === "number" && typeof input2 === "number" || resultConversion === 'as-number') {
        result = +input1 + +input2;
    }
    else {
        result = input1.toString() + input2.toString();
    }
    if (resultConversion === "as-number") {
        return +result;
    }
    else {
        return result.toString();
    }
};
const combinedAges = combine(30, 26, "as-number");
console.log(combinedAges);
const combinedStringAges = combine(30, 26, "as-number");
console.log(combinedStringAges);
const combinedNames = combine("Max", "Anna", "as-text");
console.log(combinedNames);
// unknown type
let userInput;
let userNameTwo;
userInput = 5;
userInput = "Max";
if (typeof userInput === "string") {
    userNameTwo = userInput;
}
// never type
function generateError(message, code) {
    throw { message: message, errorCode: code };
}
const result = generateError("An error occured!", 500);
console.log(result);
console.log("Sending...");
let logged;
const sendAnalytics = (data) => {
    console.log(data);
    logged = true;
    logged = "Max";
};
sendAnalytics("The data");
const button = document.querySelector("button");
// a comment
if (button) {
    button.addEventListener("click", () => {
        console.log("Clicked!");
    });
}
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
const addForLet = (a, b) => a + b;
console.log(addForLet(2, 5));
const printOutput = (output) => console.log(output);
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
const ticket = (a, b = 1) => a + b;
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
const copiedPerson = Object.assign({}, aPerson);
// rest parameters
const addRest = (...numbers) => {
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
// object orient programming (oop)
// work with real-life entities in code
// classes are bluprints for objects
// define how objects look like, properties and methods they have
// make creation of multiple, similar objects much easier
class Department {
    //explicitly choosing if private or public variables
    // readonly exists only in typescipt, prevents variable from changing after initialized the first time
    constructor(id, name) {
        this.id = id;
        this.name = name;
        // publci variable, able to be accessed from outside
        // name: string;
        // private variables are only accessible from insite the class
        this.employees = [];
        // this.name = n;
    }
    static createEmployee(name) {
        return { name: name };
    }
    addEmployee(employee) {
        this.employees.push(employee);
    }
    printEmployeeInformation() {
        console.log(this.employees.length);
        console.log(this.employees);
    }
}
// const accounting = new Department("D1", "Accounting");
// console.log(accounting);
class ITDepartment extends Department {
    // inheriting from Department
    constructor(id, admins) {
        super(id, "IT");
        this.admins = admins;
        this.admins = admins;
    }
    describe() {
        console.log("IT Department");
    }
}
// accounting.addEmployee("Max");
// accounting.addEmployee("Manu");
const tech = new ITDepartment("d1", ["Max"]);
class AccountingDepartment extends Department {
    constructor(id, reports) {
        super(id, "Accounting");
        this.reports = reports;
        this.lastReport = reports[0];
    }
    // getter method has to return something
    get mostRecentReport() {
        if (this.lastReport) {
            return this.lastReport;
        }
        throw new Error("No report found.");
    }
    set mostRecentReport(value) {
        if (!value) {
            throw new Error("Please pass in a value");
        }
        this.addReport(value);
    }
    static getInstance() {
        if (AccountingDepartment.instance) {
            return this.instance;
        }
        this.instance = new AccountingDepartment("d2", []);
        return this.instance;
    }
    describe() {
        console.log("Accounting");
    }
    // protected, private, public are only used in typescript
    addEmployee(name) {
        if (name === "Max") {
            return;
        }
        this.employees.push(name);
    }
    addReport(text) {
        this.reports.push(text);
        this.lastReport = text;
    }
    printeports() {
        console.log(this.reports);
    }
}
// call static variables
const employee1 = Department.createEmployee("Max");
console.log(employee1);
const finance = AccountingDepartment.getInstance();
// console log as property as it returns this.lastReport
console.log(finance.mostRecentReport);
finance.mostRecentReport = "";
// this won't work because the variable is private
// accounting.employees[2] = "Anna";
// accounting.describe();
// accounting.printEmployeeInformation();
// const accountingCopy = { name: "DUMMY", describe: accounting.describe };
// accountingCopy.describe();
// ^ constructor functions and using 'this' keyword
// interfaces
// describes the structure of an object
// how the object should look like
let addFunction;
addFunction = (n1, n2) => {
    return n1 + n2;
};
class Person {
    constructor(n) {
        this.age = 30;
        if (n) {
            this.name = n;
        }
    }
    greet(phrase) {
        if (this.name) {
            console.log(phrase + " " + this.name);
        }
        else {
            console.log("Hi!");
        }
    }
}
let user1;
// user1 = new Person("Max");
user1 = new Person();
user1.greet("Hi there - I am");
console.log(user1);
// intersection types
var _a;
const e1 = {
    name: "Max",
    priviledges: ["create-server"],
    startDate: new Date(),
};
function addGuard(a, b) {
    if (typeof a === "string" || typeof b === "string") {
        return a.toString() + b.toString();
    }
    return a + b;
}
;
const resultGuard = addGuard("Max", "Schwarz");
resultGuard.split(" ");
const fetchedUserData = {
    id: 'u1',
    name: 'Max',
    job: { title: 'CEO', description: 'My own company' }
};
// optional chaining
console.log((_a = fetchedUserData === null || fetchedUserData === void 0 ? void 0 : fetchedUserData.job) === null || _a === void 0 ? void 0 : _a.title);
// nullish coalescing
const userInputNullish = null;
const storedData = userInputNullish !== null && userInputNullish !== void 0 ? userInputNullish : 'DEFAULT';
console.log(storedData);
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
const merge = (objA, objB) => {
    return Object.assign(objA, objB);
};
// console.log(merge({ name: "Max" }, { age: 30 }));
const mergedObj = merge({ name: "Max" }, { age: 30 });
console.log(mergedObj.age);
const countAndPrint = (element) => {
    let descriptionText = "Got no value.";
    if (element.length > 0) {
        descriptionText = "Got " + element.length + " elements.";
    }
    return [element, descriptionText];
};
console.log(countAndPrint("Hi there!"));
// keyof constraint
const extractAndConvert = (obj, key) => {
    return "Value: " + obj[key];
};
extractAndConvert({ name: "Max" }, "name");
class DataStorage {
    constructor() {
        this.data = [];
    }
    addItem(item) {
        this.data.push(item);
    }
    removeItem(item) {
        if (this.data.indexOf(item) === -1) {
            return;
        }
        this.data.splice(this.data.indexOf(item), -1); // -1
    }
    getItems() {
        return [...this.data];
    }
}
const textStorage = new DataStorage();
textStorage.addItem("Max");
textStorage.addItem("Manu");
textStorage.removeItem("Max");
console.log(textStorage.getItems());
const numberStorage = new DataStorage();
// using partial
const createCourseGoal = (title, description, date) => {
    // return {title: title, description: description, date: Date}
    let courseGoal = {};
    courseGoal.title = title;
    courseGoal.description = description;
    courseGoal.completeUntil = date;
    return courseGoal;
};
// read only strings
const names1 = ["Max", "Anna"];
// names1.push("Manu");
// decorator factories
const Logger = (logString) => {
    console.log("LOGGER FACTORY");
    return function (constructor) {
        console.log(logString);
        console.log(constructor);
    };
};
// template decorator
const withTemplate = (template, hookId) => {
    console.log("LOGGER TEMPLATE");
    return function (originalConstructor) {
        return class extends originalConstructor {
            constructor(..._) {
                super();
                console.log("Rendering template");
                const hookEl = document.getElementById(hookId);
                if (hookEl) {
                    hookEl.innerHTML = template;
                    hookEl.querySelector("h1").textContent = this.name;
                }
            }
        };
    };
};
// decorators run bottom up
let PersonDecorator = class PersonDecorator {
    constructor() {
        this.name = "Max";
        console.log("Creating person object...");
    }
};
PersonDecorator = __decorate([
    Logger("LOGGING"),
    withTemplate("<h1>My Person Object</h1>", "app")
], PersonDecorator);
// const pers = new PersonDecorator();
// console.log(pers);
// ---
const Log = (target, propertyName) => {
    console.log("Property decorator!");
    console.log(target, propertyName);
};
const Log2 = (target, name, descriptor) => {
    console.log("Accessor decorator!");
    console.log(target);
    console.log(name);
    console.log(descriptor);
};
const Log3 = (target, name, descriptor) => {
    console.log("Method decorator!");
    console.log(target);
    console.log(name);
    console.log(descriptor);
};
const Log4 = (target, name, position) => {
    console.log("Parameter decorator!");
    console.log(target);
    console.log(name);
    console.log(position);
};
class Product {
    constructor(t, p) {
        this.title = t;
        this._price = p;
    }
    set price(val) {
        if (val > 0) {
            this._price = val;
        }
        else {
            throw new Error("Invalid price - should be positive!");
        }
    }
    getPriceWithTax(tax) {
        return this._price * (1 + tax);
    }
}
__decorate([
    Log
], Product.prototype, "title", void 0);
__decorate([
    Log2
], Product.prototype, "price", null);
__decorate([
    Log3,
    __param(0, Log4)
], Product.prototype, "getPriceWithTax", null);
const p1 = new Product("Book", 19);
const p2 = new Product("Book 2", 29);
// Project Type
var ProjectStatus;
(function (ProjectStatus) {
    ProjectStatus[ProjectStatus["Active"] = 0] = "Active";
    ProjectStatus[ProjectStatus["Finished"] = 1] = "Finished";
})(ProjectStatus || (ProjectStatus = {}));
class Project {
    constructor(id, title, description, people, status) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.people = people;
        this.status = status;
    }
}
class State {
    constructor() {
        this.listeners = [];
    }
    addListener(listenerFn) {
        this.listeners.push(listenerFn);
    }
}
class ProjectState extends State {
    constructor() {
        super();
        this.projects = [];
    }
    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new ProjectState();
        return this.instance;
    }
    addProject(title, description, numOfPeople) {
        const newProject = new Project(Math.random().toString(), title, description, numOfPeople, ProjectStatus.Active);
        this.projects.push(newProject);
        this.updateListeners();
    }
    moveProject(projectId, newStatus) {
        const project = this.projects.find((prj) => prj.id === projectId);
        if (project && project.status !== newStatus) {
            project.status = newStatus;
            this.updateListeners();
        }
    }
    updateListeners() {
        for (const listenerFn of this.listeners) {
            listenerFn(this.projects.slice());
        }
    }
}
const projectState = ProjectState.getInstance();
const validate = (validatableInput) => {
    let isValid = true;
    if (validatableInput.required) {
        isValid = isValid && validatableInput.value.toString().trim().length !== 0;
    }
    if (validatableInput.minLength != null && typeof validatableInput.value === "string") {
        isValid = isValid && validatableInput.value.length >= validatableInput.minLength;
    }
    if (validatableInput.maxLength != null && typeof validatableInput.value === "string") {
        isValid = isValid && validatableInput.value.length <= validatableInput.maxLength;
    }
    if (validatableInput.min != null && typeof validatableInput.value === "number") {
        isValid = isValid && validatableInput.value >= validatableInput.min;
    }
    if (validatableInput.max != null && typeof validatableInput.value === "number") {
        isValid = isValid && validatableInput.value <= validatableInput.max;
    }
    return isValid;
};
// autobind decorator
const autobind = (_, _2, descriptor) => {
    const originalMethod = descriptor.value;
    const adjDescriptor = {
        configurable: true,
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
        },
    };
    return adjDescriptor;
};
// Component Base Class
class Component {
    constructor(templateId, hostElementId, insertAtStart, newElementId) {
        this.attach = (insertAtBeginning) => {
            this.hostElement.insertAdjacentElement(insertAtBeginning ? "afterbegin" : "beforeend", this.element);
        };
        this.templateElement = document.getElementById(templateId);
        this.hostElement = document.getElementById(hostElementId);
        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild;
        if (newElementId) {
            this.element.id = newElementId;
        }
        this.attach(insertAtStart);
    }
}
// Projectitem Class
class ProjectItem extends Component {
    constructor(hostId, project) {
        super("single-project", hostId, false, project.id);
        this.project = project;
        this.configure();
        this.renderContent();
    }
    get persons() {
        if (this.project.people === 1) {
            return "1 person";
        }
        else {
            return `${this.project.people} persons`;
        }
    }
    dragStartHandler(event) {
        event.dataTransfer.setData("text/plain", this.project.id);
        event.dataTransfer.effectAllowed = "move";
    }
    dragEndHandler(_) {
        console.log("DragEnd");
    }
    configure() {
        this.element.addEventListener("dragstart", this.dragStartHandler);
        this.element.addEventListener("dragend", this.dragEndHandler);
    }
    renderContent() {
        this.element.querySelector("h2").textContent = this.project.title;
        this.element.querySelector("h3").textContent = this.persons + " assigned";
        this.element.querySelector("p").textContent = this.project.description;
    }
}
__decorate([
    autobind
], ProjectItem.prototype, "dragStartHandler", null);
// ProjectList Class
class ProjectList extends Component {
    constructor(type) {
        super("project-list", "app", false, `${type}-projects`);
        this.type = type;
        this.configure = () => {
            this.element.addEventListener("dragover", this.dragOverHandler);
            this.element.addEventListener("dragleave", this.dragLeaveHandler);
            this.element.addEventListener("drop", this.dropHandler);
            projectState.addListener((projects) => {
                const relevantProjects = projects.filter((prj) => {
                    if (this.type === "active") {
                        return prj.status === ProjectStatus.Active;
                    }
                    return prj.status === ProjectStatus.Finished;
                });
                this.assignedProjects = relevantProjects;
                this.renderProjects();
            });
        };
        this.renderContent = () => {
            const listId = `${this.type}-projects-list`;
            this.element.querySelector("ul").id = listId;
            this.element.querySelector("h2").textContent = this.type.toUpperCase() + "PROJECTS";
        };
        this.assignedProjects = [];
        this.configure();
        this.renderContent();
    }
    dragOverHandler(event) {
        if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
            event.preventDefault();
            const listEl = this.element.querySelector("ul");
            listEl.classList.add("droppable");
        }
    }
    dropHandler(event) {
        const prjId = event.dataTransfer.getData("text/plain");
        projectState.moveProject(prjId, this.type === "active" ? ProjectStatus.Active : ProjectStatus.Finished);
    }
    dragLeaveHandler(_) {
        const listEl = this.element.querySelector("ul");
        listEl.classList.remove("droppable");
    }
    renderProjects() {
        const listEl = document.getElementById(`${this.type}-projects-list`);
        listEl.innerHTML = "";
        for (const prjItem of this.assignedProjects) {
            new ProjectItem(this.element.querySelector("ul").id, prjItem);
        }
    }
}
__decorate([
    autobind
], ProjectList.prototype, "dragOverHandler", null);
__decorate([
    autobind
], ProjectList.prototype, "dropHandler", null);
__decorate([
    autobind
], ProjectList.prototype, "dragLeaveHandler", null);
// Project Class
class ProjectInput extends Component {
    constructor() {
        super("project-input", "app", true, "user-input");
        this.configure = () => {
            this.element.addEventListener("submit", this.submitHandler);
        };
        this.gatherUserInput = () => {
            const enteredTitle = this.titleInputElement.value;
            const enteredDescription = this.descriptionInputElement.value;
            const enteredPeople = this.peopleInputElement.value;
            const titleValidatable = {
                value: enteredTitle,
                required: true,
            };
            const descriptionValidatable = {
                value: enteredDescription,
                required: true,
                minLength: 5,
            };
            const peopleValidatable = {
                value: +enteredPeople,
                required: true,
                min: 1,
                max: 5,
            };
            if (!validate(titleValidatable) || !validate(descriptionValidatable) || !validate(peopleValidatable)) {
                alert("Invalid input, please try again!");
                return;
            }
            else {
                return [enteredTitle, enteredDescription, +enteredPeople];
            }
        };
        this.clearInputs = () => {
            (this.titleInputElement.value = ""), (this.descriptionInputElement.value = ""), (this.peopleInputElement.value = "");
        };
        this.titleInputElement = this.element.querySelector("#title");
        this.descriptionInputElement = this.element.querySelector("#description");
        this.peopleInputElement = this.element.querySelector("#people");
        this.configure();
    }
    renderContent() { }
    submitHandler(event) {
        event.preventDefault();
        const userInput = this.gatherUserInput();
        if (Array.isArray(userInput)) {
            const [title, desc, people] = userInput;
            projectState.addProject(title, desc, people);
            console.log(title, desc, people);
            this.clearInputs();
        }
    }
}
__decorate([
    autobind
], ProjectInput.prototype, "submitHandler", null);
const prjInput = new ProjectInput();
const activePrjList = new ProjectList("active");
const finishedPrjList = new ProjectList("finished");
