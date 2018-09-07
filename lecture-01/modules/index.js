const calculator = require("./calculator");

function calculate(first, second, operation) {
    if (operation === "+"){
        return calculator.add(first, second);
    }

    if (operation === "-"){
        return calculator.subtract(first, second);
    }

    if (operation === "*"){
        return calculator.multiply(first, second);
    }

    throw Error("Invalid operation");

}

console.log(calculate(10, 3, "*"));