const http = require("http");
const url = require("url");
const query = require('querystring');
const fshelper = require("./fs-helper");

const params = process.argv.slice(2);

const listener = async (request, response) => {

    const urlValue = url.parse(request.url);
    const queryValue = query.parse(urlValue.query);

    if ((urlValue.pathname === "/") || (urlValue.pathname.endsWith(".html"))) {

        let html = await fshelper.readHtml("./template.html");
        html=html.replace('%%corgies%%',"");
        response.write(html);
        //ova ke ostane samo da se renderira na link
    }
    else if((urlValue.pathname === "/dogs") || (urlValue.pathname==="/cats")){
        let html = await fshelper.readHtml("./template.html");
        console.log(urlValue.pathname);
        
        const files = await fshelper.readFolder("../images" + urlValue.pathname);

   

        let images = "";
        for (let index = 0; index < files.length; index++) {
            const element = files[index];

            images += `<li><a href="${urlValue.pathname}/${element}">${element}</a></li>`;
        }
        html = html.replace("%%corgies%%", images);

        response.write(html);
    } 
    else if (urlValue.pathname.endsWith(".jpg") || (urlValue.pathname.endsWith(".jpeg"))) {
        console.log(urlValue.pathname);
        const imageData = await fshelper.readImage(`../images/${urlValue.pathname}`);
        response.write(imageData);
    } else {
        response.write("not supported");
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
