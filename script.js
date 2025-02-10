let newNormalNote;
let newWrongNote;
let score = 0;
let gameOver = false;

const BOARD_SIZE = 49; // Board Size 7x7
const NORMAL_NOTE_TIME = 3000; //3 seconds
const SET_NORMAL_INTERVAL = 1000; //1 second
const SET_WRONG_INTERVAL = 2000; //2 seconds

window.onload = function () {
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

function setWrongNote() {
    if (gameOver) return;

    clearNote(newWrongNote);

    let note = createNote("X", "wrong");
    newWrongNote = document.getElementById(getRandomTile());
    newWrongNote.appendChild(note);
}

function setNote() {
    if (gameOver) return;

    let isButtonClicked = false;
    let note = createNote(3, "normal");
    let num = getRandomTile();
    newNormalNote = document.getElementById(num);
    newNormalNote.appendChild(note);

    let timeRemaining = 3;
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

    note.addEventListener("click", () => {
        selectTileType("normal");
        note.remove();
        isButtonClicked = true;
    });
}

function createNote(content, type) {
    let note = document.createElement("button");
    note.className = type;
    note.innerText = content;
    if (type === "wrong") {
        note.addEventListener("click", () => selectTileType("wrong"));
    }
    return note;
}

function clearNote(note) {
    if (note) {
        note.innerHTML = "";
    }
}

function selectTileType(type) {
    if (gameOver) return;
    switch (type) {
        case "normal":
            updateScore(10);
            break;
        case "wrong":
            endGame("GAME OVER: " + score);
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