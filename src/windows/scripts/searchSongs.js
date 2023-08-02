const {cloudsearch} = require('NeteaseCloudMusicApi');
const qqMusic = require('qq-music-api')

async function searchCloud(){

}

module.exports={
    async searchSongs(loginCookie, msg, win){
        const cookie = loginCookie.get('cloueMusicLogin');
        const resCloud = await cloudsearch({keywords: msg});
        const songs = resCloud.body.result.songs;
        qqMusic.api('search',{data:msg})
            .then((res)=>{
                console.log(1)
                win.webContents.send('1',res)
            })
            .catch((err)=>{

            })
        
        
    }
}