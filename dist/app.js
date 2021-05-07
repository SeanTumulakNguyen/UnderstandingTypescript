"use strict";
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
    describe() {
        console.log("Department: " + this.name);
    }
    addEmployee(employee) {
        this.employees.push(employee);
    }
    printEmployeeInformation() {
        console.log(this.employees.length);
        console.log(this.employees);
    }
}
const accounting = new Department("D1", "Accounting");
console.log(accounting);
accounting.addEmployee("Max");
accounting.addEmployee("Manu");
// this won't work because the variable is private
// accounting.employees[2] = "Anna";
accounting.describe();
accounting.printEmployeeInformation();
const accountingCopy = { name: "DUMMY", describe: accounting.describe };
// accountingCopy.describe();
// ^ constructor functions and using 'this' keyword
