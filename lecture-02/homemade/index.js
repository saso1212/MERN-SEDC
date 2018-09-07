const http = require("http");
const url = require("url");
const query = require('querystring');


const params = process.argv.slice(2);

const listener = (request, response) => {

    console.log(`From ${request.headers.host}`);
    const urlValue = url.parse(request.url);
    const queryValue = query.parse(urlValue.query);

    console.log(urlValue);
    console.log(queryValue);

    response.write("<h1>Hello from SWekster's Node.js Server!</h1>");
    response.write(`<div>From: <pre>${request.headers.host}</pre></div>`);
    response.write(`<div>URL: <pre>${urlValue.pathname}</pre></div>`);
    response.write("<ul>");
    for (const qparam in queryValue) {
        response.write(`<li>
            ${qparam}: ${queryValue[qparam]}
        </li>`)
    }
    response.write("</ul>");

    if (urlValue.pathname.startsWith("/api/calc/")) {
        let [, , ,first, op, second] =urlValue.pathname.split("/");
        first = Number(first);
        second = Number(second);
        if (op === "+") {
            const result = first + second;
            response.write(`<div>${first} ${op} ${second} = ${result} </div>`)
        }
        else if (op === "-") {
            const result = first - second;
            response.write(`<div>${first} ${op} ${second} = ${result} </div>`)
        }
        else if (op === "*") {
            const result = first * second;
            response.write(`<div>${first} ${op} ${second} = ${result} </div>`)
        }
        else if (op === "%") {
            const result = first / second;
            response.write(`<div>${first} ${op} ${second} = ${result} </div>`)
        } else {
            response.write(`<div>${op} is invalid operation </div>`)
        }
    }
    response.end();
};


const server = http.createServer(listener);
const port = params[0] || 8081;

server.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }

    console.log(`server is listening on ${port}`)
})