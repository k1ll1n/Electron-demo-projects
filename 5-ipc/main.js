log('main process working');

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require("path");
const url = require("url");
const ipc = electron.ipcMain;
const dialog = electron.dialog;


let win;

function createWindow() {
    win = new BrowserWindow({width: 800, height: 800});

    win.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file',
        slashes: true
    }));

    win.webContents.openDevTools();
    win.on('closed', () => {
       win = null;
    });
}

ipc.on('async-message', (event) => {
    //dialog.showErrorBox('An error message', 'Demo of an error message!');
    event.sender.send('async-reply', 'Main process opened the error dialog');
});

ipc.on('sync-message', (event) => {
    event.returnValue = 'sync-reply-response';
});

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
    if (win === null) createWindow();
});

function log(msg) {
    console.log(msg)
}