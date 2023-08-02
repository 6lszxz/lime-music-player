const { BrowserWindow } = require('electron')

module.exports={
    openWindow(name, path, windowStack, isOpenDevTools){
        const win = new BrowserWindow({
            width: 800,
            height: 600,
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false,
            }
        });
        windowStack[name] = win;
        win.loadFile(path);
        if(isOpenDevTools){
            win.openDevTools();
        }
        return win;
    },
    closeWindow(windowStack, name){
        windowStack[name].close();
        delete windowStack[name];
    }
}