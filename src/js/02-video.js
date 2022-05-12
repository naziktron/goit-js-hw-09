import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Vimeo.Player(iframe);
const STORAGE_KEY = 'videoplayer-current-time';
const currentTime = localStorage.getItem(STORAGE_KEY);


if(currentTime){
    player.setCurrentTime(currentTime);
}

function timeUpdate() {
    player.getCurrentTime().then(function(seconds){
        localStorage.setItem(STORAGE_KEY,seconds);
    }).catch(function(error){
        console.log("Error")
    });
}
player.on('timeupdate', throttle(timeUpdate, 1000));


