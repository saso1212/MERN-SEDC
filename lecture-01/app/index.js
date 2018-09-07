const math = require('mathjs');

process.on('exit', (code) => {
    console.log(`About to exit with code: ${code}`);
});

function print(message, value) {
    const precision = 14
    console.log(`${message}=${math.format(value, precision)}`)
}

const numbers = process.argv
    .slice(2)
    .map(param => Number(param));

const hasNans = numbers.some(num => isNaN(num));

if (hasNans) {
    process.exit(100);
}

const roots = numbers.map(num => ({
    number: num,
    root: math.sqrt(num)
}));

for (const item of roots) {
    print(`math.sqrt(${item.number})`, item.root);
}