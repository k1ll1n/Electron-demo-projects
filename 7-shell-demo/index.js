const openBtn = document.getElementById('openBtn');
const shell = require('electron').shell;

openBtn.addEventListener('click', (event) => {
    //shell.showItemInFolder('/home/killin/WebstormProjects/ElectonDemo/shell-demo/test.txt')
    shell.openItem('/home/killin/WebstormProjects/ElectonDemo/shell-demo/tQ9VDse.jpg');
    shell.openExternal('http://example.com')
});