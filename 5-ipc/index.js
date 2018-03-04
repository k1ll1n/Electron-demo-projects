const electron = require('electron');
const ipc = electron.ipcRenderer;

const asyncBtn = document.getElementById('async-btn');
const syncBtn = document.getElementById('sync-btn');

asyncBtn.addEventListener('click', () => {
    console.log('async msg 1');
    ipc.send('async-message');
    console.log('async msg 2');
});
syncBtn.addEventListener('click', () => {
    console.log('sync msg 1');
    const reply = ipc.sendSync('sync-message');
    console.log(reply);
    console.log('sync msg 2');
});

ipc.on('async-reply', (event, arg) => {
    console.log(arg)
});

const BrowserWindow = electron.remote.BrowserWindow;
let window = new BrowserWindow();
window.loadURL('https://habrahabr.ru/');