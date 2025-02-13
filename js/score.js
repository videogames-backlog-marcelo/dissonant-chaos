let score = 0;

function handleScore(type) {
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
        case "mystery":
            
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