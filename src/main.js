const {app, BrowserWindow, ipcMain, Notification}= require('electron')
const Store = require('electron-store')
const {openWindow, closeWindow} = require('./windows/scripts/windowOpenClose');
const {searchSongs} = require('./windows/scripts/searchSongs')

let windowNow = null;
// 所有的窗口集合，其实可以用Map的，但是不是很方便
const windowStack = {};
const loginStore = new Store();

// 加载首页
app.whenReady().then(()=>{
    openWindow('main', './windows/views/index.html', windowStack, false);
})
// 退出APP
app.on('window-all-closed',()=>{
    app.quit();
})
// 跳转到“账号管理”窗口 
ipcMain.on('goToAccount',()=>{
    openWindow('changeAccount', './windows/views/changeAccounts.html', windowStack, false);
})
// 关闭“账号管理”窗口
ipcMain.on('shutDownChangeAccount',()=>{
    closeWindow(windowStack, 'changeAccount');
})
// 打开登录网易云窗口
ipcMain.on('cloudMusicAccount',()=>{
    openWindow('cloudMusicAccount', './windows/views/cloudMusicAccount.html', windowStack, false);
})
ipcMain.on('cloudMusicLogin',()=>{
    const {cloudMusicLogin} = require('./windows/scripts/login')
    cloudMusicLogin(windowStack,loginStore);
})
// 打开登录QQ音乐窗口
ipcMain.on('qqMusicAccount',()=>{
    openWindow('qqMusicAccount', './windows/views/qqMusicAccount.html', windowStack, false);
})
// QQ音乐登录
ipcMain.on('qqMusicLogin',(event, cookie)=>{
    const {qqMusicLogin} = require('./windows/scripts/login')
    qqMusicLogin(windowStack, loginStore, cookie);
})
// 搜索结果
ipcMain.on('searchSongs',(event, value)=>{
    const win = openWindow('searchSongs', './windows/views/searcchSongs.html', windowStack, true);
    searchSongs(loginStore, value,win);
    win.webContents.send('songs', value);
})
