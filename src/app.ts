// object orient programming (oop)
// work with real-life entities in code

// classes are bluprints for objects
// define how objects look like, properties and methods they have
// make creation of multiple, similar objects much easier

class Department {
  // publci variable, able to be accessed from outside
  // name: string;
  // private variables are only accessible from insite the class
  protected employees: string[] = [];

  //explicitly choosing if private or public variables
  // readonly exists only in typescipt, prevents variable from changing after initialized the first time
  constructor(private readonly id: string, public name: string) {
    // this.name = n;
  }

  describe(this: Department) {
    console.log("Department: " + this.name);
  }

  addEmployee(employee: string) {
    this.employees.push(employee);
  }

  printEmployeeInformation() {
    console.log(this.employees.length);
    console.log(this.employees);
  }
}

const accounting = new Department("D1", "Accounting");
console.log(accounting);

class ITDepartment extends Department {
  // inheriting from Department
  constructor(id: string, public admins: string[]) {
    super(id, "IT");
    this.admins = admins;
  }
}

accounting.addEmployee("Max");
accounting.addEmployee("Manu");

const tech = new ITDepartment("d1", ["Max"]);

class AccountingDepartment extends Department {
  private lastReport: string;

  // getter method has to return something
  get mostRecentReport() {
    if (this.lastReport) {
      return this.lastReport;
    }
    throw new Error("No report found.");
  }

  set mostRecentReport(value: string) {
    if (!value) {
      throw new Error("Please pass in a value");
    }
    this.addReport(value);
  }

  constructor(id: string, private reports: string[]) {
    super(id, "IT");
    this.lastReport = reports[0];
  }

  // protected, private, public are only used in typescript

  addEmployee(name: string) {
    if (name === "Max") {
      return;
    }
    this.employees.push(name);
  }

  addReport(text: string) {
    this.reports.push(text);
    this.lastReport = text;
  }

  printeports() {
    console.log(this.reports);
  }
}

const finance = new AccountingDepartment("d3", ["Max"]);

// console log as property as it returns this.lastReport
console.log(finance.mostRecentReport);

finance.mostRecentReport = "";

// this won't work because the variable is private
// accounting.employees[2] = "Anna";

accounting.describe();
accounting.printEmployeeInformation();

const accountingCopy = { name: "DUMMY", describe: accounting.describe };

// accountingCopy.describe();

// ^ constructor functions and using 'this' keyword
