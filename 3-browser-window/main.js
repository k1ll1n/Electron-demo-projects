log('From main js','main process working');


const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require("path");
const url = require("url");

let win, dimWindow, colorWindow, framelessWindow;
let parentWindow, childWindow;

function createWindow() {
    /*win = new BrowserWindow();
    dimWindow = new BrowserWindow({width: 500, height: 500});
    colorWindow = new BrowserWindow({backgroundColor: '#228b22'});
    framelessWindow = new BrowserWindow({backgroundColor: '#800000', frame:false});*/

    parentWindow = new BrowserWindow({title: 'Parent'});
    childWindow = new BrowserWindow({show: false, parent: parentWindow, modal: true, title: 'Child'});
    childWindow.loadURL('https://habrahabr.ru/')
    childWindow.once('ready-to-show', () => childWindow.show())
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
    if (win === null) createWindow();
});

function log(...msg) {
    console.log(msg)
}