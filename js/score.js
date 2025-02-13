let score = 0;

function handleScore(type, sequenceSize = 0) {
    if (gameOver) return;
    switch (type) {
        case "normal":
            updateScore(10);
            break;
        case "strong":
            updateScore(30);
            break;
        case "wrong":
            updateScore(-5);
            break;
        case "sequence":
            updateScore(sequenceSize * 10);
            break;
        default:
            endGame("An error occurred");
            break;
    }
}

function updateScore(points) {
    score += points;
    document.getElementById("score").innerText = score.toString();
}