let backgroundMusic;

function setMusic(){
    backgroundMusic = new Audio("music/block.mp3");
    backgroundMusic.loop = true;
    backgroundMusic.volume = 0.5;
    backgroundMusic.play().catch(error => {
        console.log("Reproducción automática bloqueada, iniciar manualmente");
    });

    let musicToggleButton = document.createElement("button");
    musicToggleButton.innerText = "🔊 Música";
    musicToggleButton.onclick = toggleMusic;
    document.body.appendChild(musicToggleButton);
}

function toggleMusic() {
    if (backgroundMusic.paused) {
        backgroundMusic.play();
    } else {
        backgroundMusic.pause();
    }
}