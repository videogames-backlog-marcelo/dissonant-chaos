let newNormalNote;
let newWrongNote;
let score = 0;
let gameOver = false;

window.onload = function() {
    setGame();
}

function setGame(){
    //Board (7*7)
    for (i=0; i<49;i++){
        let tile = document.createElement("div");
        tile.id = i.toString();
        document.getElementById("board").appendChild(tile);
    }
    setInterval(setNote, 1000);
    setInterval(setWrongNote, 2000);
}

function getRandomTile() {
    let num = Math.floor(Math.random() * 49);
    return num.toString();
}

function setWrongNote(){
    if(gameOver){
        return;
    }

    if(newWrongNote){
        newWrongNote.innerHTML = "";
    }

    let note = document.createElement("button");
    note.addEventListener("click", function () {
        selectTile("wrong");
      });
    note.className = "wrong";
    note.innerText = "X";

    let num = getRandomTile();
    newWrongNote = document.getElementById(num);
    newWrongNote.appendChild(note);
}

function setNote(){
    if(gameOver){
        return;
    }

    let clicked = false;

    let note = document.createElement("button");
    note.addEventListener("click", function () {
        selectTile("normal");
        note.parentElement.removeChild(note);
        clicked = true;
      });
    let num = getRandomTile();
    newNormalNote = document.getElementById(num);
    
    let timeRemaining = 3;

    note.innerText = timeRemaining;
    newNormalNote.appendChild(note);

    let countdown = setInterval(() => {
        if(clicked) return;
        timeRemaining--;
        if (timeRemaining > 0) {
            note.innerText = timeRemaining;
        } else {
            clearInterval(countdown);
            gameOver = true;
            document.getElementById("score").innerText = "GAME OVER: " + score.toString();
        }
    }, 1000);
}

function selectTile(type) {
    if(gameOver){
        return;
    }
    switch(type){
        case "normal":
            score += 10;
            document.getElementById("score").innerText = score.toString();
            break;
        case "wrong":
            gameOver = true;
            document.getElementById("score").innerText = "GAME OVER: " + score.toString();
            break;
        default:
            gameOver = true;
            document.getElementById("score").innerText = "An error occurred";
            break;
    }
}