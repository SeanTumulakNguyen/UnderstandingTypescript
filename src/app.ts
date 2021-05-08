// intersection types

// could use interface types and extending the interfaces down below as well
type Admin = {
    name: string;
    priviledges: string[];
};

type Employee = {
    name: string;
    startDate: Date;
}

// interface ElevatedEmployee extends Admin, Employee { }

type ElevatedEmployee = Admin & Employee;

const e1: ElevatedEmployee = {
    name: 'Max',
    priviledges: ['create-server'],
    startDate: new Date()
}

type CombinableIntersection = string | number;
type Numeric = number | boolean

type Universal = CombinableIntersection & Numeric