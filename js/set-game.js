const BOARD_SIZE = 49; // Board Size 7x7

const SET_NORMAL_INTERVAL = 1500; //1.5 second
const SET_WRONG_INTERVAL = 2000; //2 seconds

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