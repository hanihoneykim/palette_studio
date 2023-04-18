let nowAlbumart = document.querySelector(".song-watch__albumArt");
const song = document.querySelector("audio");
let volume = document.querySelector('#volume');
let timeline = document.querySelector('#timeline')

const handleInputRange = (event) => {
    var gradient_value = 100 / event.target.attributes.max.value;
    event.target.style.background = 'linear-gradient(to right, #515151 0%, #515151 '+gradient_value * event.target.value +'%, #bfbfbf ' +gradient_value *  event.target.value + '%, #bfbfbf 100%)';
}


timeline.addEventListener('input', handleInputRange);
volume.addEventListener('input', handleInputRange);
