const fs = require("fs");

const readFolder = (name) => {
    return new Promise((resolve, reject) => {
        fs.readdir(name, (err, files) => {
            if (err) {
                reject(err);
            } else {
                resolve(files);
            }
        })
    });
}

const readImage = (imageName) => {
    return new Promise((resolve, reject) => {
        fs.readFile(imageName, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        })
    });
}

const readHtml = (fileName) => {
    return new Promise((resolve, reject) => {
        fs.readFile(fileName, { encoding: "utf-8" }, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        })
    });
}

module.exports = {
    readFolder,
    readImage,
    readHtml
}