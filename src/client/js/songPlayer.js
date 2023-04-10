const songContainer = document.getElementById("songContainer");
const songTitle = document.getElementById("songTitle");

const handleSongClick = () => {
    const { id } = songContainer.dataset;
    fetch(`/api/songs/${id}/view`, {
        method: "POST",
    });
};

songTitle.addEventListener("click", handleSongClick);