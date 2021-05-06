// object orient programming (oop)
// work with real-life entities in code

// classes are bluprints for objects
// define how objects look like, properties and methods they have
// make creation of multiple, similar objects much easier

class Department {
  name: string;

  constructor(n: string) {
    this.name = n;
  }
}

const accounting = new Department("Accounting");
console.log(accounting);
