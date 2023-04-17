const heart = document.querySelector(".likes-box")

const handleHeartColor = () => {
    if (heart.style.color='white') {
        heart.style.color='skyblue';
    }
}

heart.addEventListener("click", handleHeartColor);