const {Notification} = require('electron');
const {closeWindow} = require('./windowOpenClose');

module.exports ={
    // 网易云登录
    async cloudMusicLogin(windowStack, loginStore){
        const {login_qr_key, login_qr_create, login_qr_check, login} = require('NeteaseCloudMusicApi');
        const loginObject= {
            key: '',
            qrimg: 'imgUrl',
            timestamp: Date.now(),
            cookie: loginStore.get('cloudMusicLogin'),
        }
        const res = await login_qr_key(loginObject);
        loginObject.key = res.body.data.unikey;
        const imgResponse = await login_qr_create(loginObject);
        loginObject.qrimg = imgResponse.body.data.qrimg;
        const win = windowStack['cloudMusicAccount'];
        win.webContents.send('qrCodeCloudMusic',loginObject.qrimg);
        const id = setInterval(async ()=>{
            const res = await login_qr_check(loginObject);
            if(res.body.code === 803){
                loginStore.set('cloudMusicLogin', res.body.cookie);
                loginObject.cookie = res.body.cookie;
                new Notification({title:'提示', body:'登录成功'}).show();
                closeWindow(windowStack,'cloudMusicAccount');
                clearInterval(id);
            }
        },1000)
    },
    // QQ音乐登录
    async qqMusicLogin(windowStack, loginStore, cookie){
        const qqMusic = require('qq-music-api');
        const win = windowStack['qqMusicAccount'];
        qqMusic.setCookie(cookie);
        loginStore.set('qqMusicLogin',cookie);
        new Notification({title:'提示', body:'登录成功'}).show();
        closeWindow(windowStack, 'qqMusicAccount');
    },

}