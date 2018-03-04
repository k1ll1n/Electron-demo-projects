log('main process working');

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require("path");
const url = require("url");
const Menu = electron.Menu;
const MenuItem = electron.MenuItem;
const globalShortcut = electron.globalShortcut;

let win;

function createWindow() {
    win = new BrowserWindow();
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file',
        slashes: true
    }));

    win.on('closed', () => {
       win = null;
    });
}

app.on('ready', () => {
    createWindow();
    const template = [
        {
            label:'demo',
            submenu: [
                {
                    label: 'label 1',
                    click: () => console.log('Clicked label 1')
                },
                {type: 'separator'},
                {
                    label: 'label 2'
                }
            ]
        },
        {
            label: 'help',
            submenu: [
                {
                    label: 'About',
                    click: () => electron.shell.openExternal('https://github.com'),
                    accelerator: 'CmdOrCtrl + Shift + H'
                }
            ],
        }
        ];
    const menu = Menu.buildFromTemplate(template);

    Menu.setApplicationMenu(menu);

    const ctxMenu = new Menu;
    ctxMenu.append(new MenuItem({
        label: 'Hello',
        click: () => console.log('context menu')
    }));

    win.webContents.on('context-menu', (e, params) => {
        ctxMenu.popup(win, params.x, params.y);
    });

    globalShortcut.register('CmdOrCtrl+1', () => {
        win.show();
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
    if (win === null) createWindow();
});

function log(msg) {
    console.log(msg)
}