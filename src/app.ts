// decorator factories
const Logger = (logString: string) => {
  console.log('LOGGER FACTORY')
  return function (constructor: Function) {
    console.log(logString);
    console.log(constructor);
  };
};

// template decorator
const withTemplate = (template: string, hookId: string) => {
  console.log('LOGGER TEMPLATE')
  return function (constructor: any) {
    console.log('Rendering template')
    const hookEl = document.getElementById(hookId);
    const p = new constructor();
    if (hookEl) {
      hookEl.innerHTML = template;
      hookEl.querySelector('h1')!.textContent = p.name
    }
  };
};
// decorators run bottom up
@Logger('LOGGING')
@withTemplate("<h1>My Person Object</h1>", "app")
class PersonDecorator {
  name = "Max";

  constructor() {
    console.log("Creating person object...");
  }
}

const pers = new PersonDecorator();

console.log(pers);
