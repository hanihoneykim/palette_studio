const song = document.querySelector("audio");
const playBtn = document.querySelector(".watch-play")
const playBtnIcon = playBtn.querySelector("i");
const muteBtn= document.getElementById("mute");
const muteBtnIcon = muteBtn.querySelector("i");
const volumeRange = document.getElementById("volume");
const currentTime = document.querySelector(".currentTime");
const totalTime = document.querySelector(".totalTime");


let volume = document.querySelector('#volume');
let timeline = document.querySelector('#timeline');
let volumeValue = 0.5;
song.volume = volumeValue;


const handlePlayClick = (e) => {
    if (song.paused) {
        song.play();
        song.volume = volumeValue;
        playBtnIcon.classList = "fas fa-pause fa-sm";
    } else {
        song.pause();
        playBtnIcon.classList = "fas fa-play fa-sm";
    }
};


const handleMuteClick = (e) => {
    if (song.muted) {
        song.muted = false;
        song.volume = volumeValue;
        muteBtnIcon.classList = "fas fa-volume-up";
        volumeRange.value=volumeValue;
    } else {
        song.muted = true;
        muteBtnIcon.classList = "fas fa-volume-off";
        volumeRange.value=0;
    }
};

const handleVolumeChange = (event) => {
    const {target:{value}} = event;
    if (song.muted) {
        song.muted=false;
        muteBtnIcon.classList = "fas fa-volume-up";
    }
    volumeValue = value;
    song.volume = value;

    if (Number(value) === 0) {
        muteBtnIcon.classList = "fas fa-volume-off";
        song.muted = true;
    } else {
        song.muted = false;
        muteBtnIcon.classList = "fas fa-volume-up";
    }
};

const formatTime = (seconds) => new Date(seconds * 1000).toISOString().substring(14,19);

const handleLoadedMetaData = () => {
    totalTime.innerText = formatTime(Math.floor(song.duration));
    timeline.max = Math.floor(song.duration)
}

const handleTimeUpdate = () => {
    currentTime.innerText = formatTime(Math.floor(song.currentTime));
    timeline.value = Math.floor(song.currentTime);
}

const handleTimelineChange = (event) => {
    const {target:{value}} = event;
    song.currentTime = value;
};



const handleInputRange = (event) => {
    var gradient_value = 100 / event.target.attributes.max.value;
    event.target.style.background = 'linear-gradient(to right, #515151 0%, #515151 '+gradient_value * event.target.value +'%, #bfbfbf ' +gradient_value *  event.target.value + '%, #bfbfbf 100%)';
};



const handleWindowPlay = (e) => {
    song.play()
    song.volume = 0.5
    playBtnIcon.classList = "fas fa-pause fa-sm";
    if (song.paused) {
        playBtnIcon.classList = "fas fa-play fa-sm";
    }
};

const handleKeyboard = (e) => {
    if (e.key === " "){
        handlePlayClick();
    } else if (e.key === "m"){
        handleMuteClick();
    }
}

window.addEventListener('load', handleWindowPlay);
timeline.addEventListener('input', handleInputRange);
volume.addEventListener('input', handleInputRange);
playBtn.addEventListener('click', handlePlayClick);
muteBtn.addEventListener('click', handleMuteClick);
volumeRange.addEventListener('input', handleVolumeChange);
song.addEventListener("loadeddata", handleLoadedMetaData);
song.addEventListener('timeupdate', handleTimeUpdate);
timeline.addEventListener("input", handleTimelineChange);
window.addEventListener("keyup", handleKeyboard);