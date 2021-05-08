"use strict";
// interfaces
// describes the structure of an object
// how the object should look like
let user1;
user1 = {
    name: 'Test',
    age: 25,
    greet(phrase) {
        console.log(phrase + ' ' + this.name);
    }
};
user1.greet('Hi there - I am');
