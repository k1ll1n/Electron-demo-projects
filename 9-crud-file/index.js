const fs = require('fs');
const path = require('path');

let btnCreate = document.getElementById('btn-create');
let btnRead = document.getElementById('btn-read');
let btnDelete = document.getElementById('btn-delete');
let fileName = document.getElementById('file-name');
let fileContents = document.getElementById('file-contents');

let pathName = path.join(__dirname, 'files');

btnCreate.addEventListener('click', () => {
    let file = path.join(pathName, fileName.value);
    let contents = fileContents.value;
    fs.writeFile(file, contents, (err) => {
        if (err) return console.log(err);

        console.log('The file was created');
    });
});

btnRead.addEventListener('click', () => {
    let file = path.join(pathName, fileName.value);
    fs.readFile(file, (err, data) => {
        if (err) return console.log(err);

        fileContents.value = data;
        console.log('The file was read');
    });
});
btnDelete.addEventListener('click', () => {
    let file = path.join(pathName, fileName.value);
    fs.unlink(file, (err) => {
        if (err) return console.log(err);

        fileName.value = '';
        fileContents.value = '';
        console.log('The file was deleted');
    });
});