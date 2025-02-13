let gameOver = false;

function endGame(message) {
    gameOver = true;
    document.getElementById("score").innerText = message;
    stopMusic();
}