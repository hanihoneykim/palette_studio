const song = document.querySelector("audio");
const lp = document.getElementById("lpRotate");
const songContainer = document.getElementById("songContainer");
const songTitle = document.getElementById("songTitle");
const homePlayBtn = document.getElementById("homePlayBtn");


const handleHomePlay = (e) => {
    if (song.paused) {
        song.volume = 0.5;
        song.play();
        lp.style.display='block'
    }
}

const handleLpClick = (e) => {
    if (lp.style.display='block') {
        song.pause();
        lp.style.display='none'
    } 
}




const handleSongClick = () => {
    const { id } = songContainer.dataset;
    fetch(`/api/songs/${id}/view`, {
        method: "POST",
    });
};

lp.addEventListener("click", handleLpClick);
homePlayBtn.addEventListener("click", handleHomePlay);
songTitle.addEventListener("click", handleSongClick);
