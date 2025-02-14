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
        /*
        case "sequence":
            updateScore(sequenceSize * 10);
            break;
        case "mystery":
            score += [5, 10, 15, 20, 50, -20, -30][Math.floor(Math.random() * 7)]; break; 
        */
        default:
            endGameState("An error occurred");
            break;
    }
}

function updateScore(points) {
    score += points;
    document.getElementById("score").innerText = score.toString();
}