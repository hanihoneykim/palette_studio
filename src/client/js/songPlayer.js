const songContainer = document.getElementById("songContainer");
const songTitle = document.getElementById("songTitle");
const songOutBox = document.querySelector(".song-outbox");
const song = document.querySelector("audio");

const handleOutBoxClick = (e) => {
    let target = e.target;
    let homePlayBtn = target.classList.contains("homePlayBtn");
    let lp = target.closest(".songContainer").querySelector(".lpRotate");
    
    if (homePlayBtn) {
        song.volume = 0.5;
        song.play();
        if (lp) {
            lp.style.display = "block";
        }
    }
    if (lp && !homePlayBtn) {
        song.pause();
        lp.style.display = "none";
    }
};

songOutBox.addEventListener("click", handleOutBoxClick);
/*
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
*/

