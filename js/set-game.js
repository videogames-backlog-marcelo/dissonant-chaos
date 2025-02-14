const ROW_SIZE = 7;
const BOARD_SIZE = Math.pow(ROW_SIZE, 2); // Board Size 7x7

const SET_NORMAL_INTERVAL = 1500; //1.5 second
const SET_WRONG_INTERVAL = 2000; //2 seconds

window.onload = function () {
    setMusic();
    setGame();
};

function setGame() {
    createBoard();
    createLevel();
}

function createBoard() {
    for (let i = 0; i < BOARD_SIZE; i++) {
        let tile = document.createElement("div");
        tile.id = i.toString();
        document.getElementById("board").appendChild(tile);
    }
}

function getRandomTile(row = 0) {
    const num = Math.floor(Math.random() * (ROW_SIZE - 1)) + ((ROW_SIZE-1) * row) + 1;
    return num.toString();
}