// decorator factories
const Logger = (logString: string) => {
  console.log("LOGGER FACTORY");
  return function (constructor: Function) {
    console.log(logString);
    console.log(constructor);
  };
};

// template decorator
const withTemplate = (template: string, hookId: string) => {
  console.log("LOGGER TEMPLATE");
  return function (constructor: any) {
    console.log("Rendering template");
    const hookEl = document.getElementById(hookId);
    const p = new constructor();
    if (hookEl) {
      hookEl.innerHTML = template;
      hookEl.querySelector("h1")!.textContent = p.name;
    }
  };
};
// decorators run bottom up
@Logger("LOGGING")
@withTemplate("<h1>My Person Object</h1>", "app")
class PersonDecorator {
  name = "Max";

  constructor() {
    console.log("Creating person object...");
  }
}

const pers = new PersonDecorator();

console.log(pers);

// ---

const Log = (target: any, propertyName: string | symbol) => {
  console.log('Property decorator!')
  console.log(target, propertyName)
}

const Log2 = (target: any, name: string, descriptor: PropertyDescriptor) => {
  console.log('Accessor decorator!')
  console.log(target)
  console.log(name)
  console.log(descriptor)
}

const Log3 = (target: any, name: string | Symbol, descriptor: PropertyDescriptor) => {
  console.log('Method decorator!')
  console.log(target)
  console.log(name)
  console.log(descriptor)
}

const Log4 = (target: any, name: string | Symbol, position: number) => {
  console.log('Parameter decorator!')
  console.log(target)
  console.log(name)
  console.log(position)
}

class Product {
  @Log
  title: string;
  private _price: number;

  @Log2
  set price(val: number) {
    if (val > 0) {
      this._price = val;
    }
    else {
      throw new Error('Invalid price - should be positive!')
    }
  }

  constructor(t: string, p: number) {
    this.title = t;
    this._price = p;
  }

  @Log3
  getPriceWithTax(@Log4 tax: number) {
    return this._price * (1 + tax);
  }
}
