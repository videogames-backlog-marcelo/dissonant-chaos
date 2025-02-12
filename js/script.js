let newNote;
let newWrongNote;
let score = 0;
let gameOver = false;

const BOARD_SIZE = 49; // Board Size 7x7
const NORMAL_NOTE_TIME = 3000; //3 seconds
const SET_NORMAL_INTERVAL = 1000; //1 second
const SET_WRONG_INTERVAL = 2000; //2 seconds
const STRONG_PROBABILITY = 0.2; //20%

window.onload = function () {
    setMusic();
    setGame();
};

function setGame() {
    createBoard();
    setInterval(setNote, SET_NORMAL_INTERVAL);
    setInterval(setWrongNote, SET_WRONG_INTERVAL);
}

function createBoard() {
    for (let i = 0; i < BOARD_SIZE; i++) {
        let tile = document.createElement("div");
        tile.id = i.toString();
        document.getElementById("board").appendChild(tile);
    }
}

function getRandomTile() {
    let num = Math.floor(Math.random() * BOARD_SIZE);
    return num.toString();
}

function createNote(content, type) {
    let note = document.createElement("button");
    note.className = type;
    note.innerText = content;
    if (type === "wrong") {
        note.addEventListener("click", () => handleScore("wrong"));
    }
    styleNote(note, type);
    return note;
}

function setNote() {
    if (gameOver) return;

    let isButtonClicked = false;
    let isStrong = Math.random() < STRONG_PROBABILITY;
    let timeRemaining = isStrong ? 5 : 3;
    const buttonType = isStrong ? "strong" : "normal";

    let note = createNote(timeRemaining, buttonType);
    let num = getRandomTile();
    newNote = document.getElementById(num);
    newNote.appendChild(note);

    let countdown = setInterval(() => {
        if (isButtonClicked) {
            clearInterval(countdown);
            return;
        }
        timeRemaining--;
        if (timeRemaining > 0) {
            note.innerText = timeRemaining;
        } else {
            clearInterval(countdown);
            endGame("GAME OVER: " + score);
        }
    }, 1000);

    if (isStrong) {
        let clickCount = 0;
        note.addEventListener("click", () => {
            clickCount++;
            if (clickCount === 3) {
                handleScore("strong");
                note.remove();
                isButtonClicked = true;
            }
        });
    } else {
        note.addEventListener("click", () => {
            handleScore("normal");
            note.remove();
            isButtonClicked = true;
        });
    }
}

function setWrongNote() {
    if (gameOver) return;
    clearNote(newWrongNote);

    let note = createNote("X", "wrong");
    const randomTile = getRandomTile();
    newWrongNote = document.getElementById(randomTile);
    newWrongNote.appendChild(note);
}

function clearNote(note) {
    if (note) {
        note.innerHTML = "";
    }
}

function styleNote(note, type) {
    switch (type) {
        case "strong":
            note.style.backgroundColor = "lightblue";
            break;
        case "wrong":
            note.style.backgroundColor = "red";
            break;
        default:
            note.style.backgroundColor = "lightgray";
            break;
    }
}

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

function endGame(message) {
    gameOver = true;
    document.getElementById("score").innerText = message;
}