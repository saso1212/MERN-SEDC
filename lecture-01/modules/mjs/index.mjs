// import * as nekoeDrugoIme from './calculator';
// import nekoeime from './calculator';
import { multiply, add, subtract } from "./calculator";

function calculate(first, second, operation) {
    if (operation === "+"){
        return add(first, second);
    }

    if (operation === "-"){
        return subtract(first, second);
    }

    if (operation === "*"){
        return multiply(first, second);
    }

    throw Error("Invalid operation");

}

console.log(calculate(10, 3, "*"));