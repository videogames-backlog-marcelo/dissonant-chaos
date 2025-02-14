let level = 0;
let numberOfNotes = 0;
const MIN_NOTES = 3;
let timeRemaining = 1;
let timeDescreased = 0;
let gameOver = false;

function createLevel(){
    if (gameOver) return;
    if(level%5 == 0 && timeDescreased <=0.5) timeDescreased += 0.1;
    timeRemaining = 1;
    numberOfNotes = Math.floor(Math.random() * (ROW_SIZE-1)) + MIN_NOTES;
    const createdNotes = numberOfNotes;
    let timer;
    
    let randomNormalPos = Math.floor(Math.random() * (ROW_SIZE - 1));
    for(i=0;i<createdNotes;i++){
        let num = getRandomTile(i);
        let type = (i == randomNormalPos)? "normal": typeSelector();
        console.log(type);
        let note = createNote(type);
        switch(type){
            case "normal":
                timeRemaining+= (1-timeDescreased);
                note.addEventListener("click", () => {
                    handleScore(type);
                    note.remove();
                    numberOfNotes--;
                    if(numberOfNotes<=0){
                        clearInterval(timer);
                        level++;
                        document.getElementById("level").innerText = "Nivel: " + level;
                        clearAllNotes();
                        createLevel();
                    }
                });
                break;
            case "wrong":
                --numberOfNotes;
                let originalColor = document.getElementById("board").style.background;
                note.addEventListener("click", () => {
                    document.getElementById("board").style.backgroundColor = "red";
                    setTimeout(() => {
                        document.getElementById("board").style.backgroundColor = originalColor;
                    }, 300);
                    handleScore(type);
                    note.remove();
                });
                break;
            case "strong":
                timeRemaining += (1-timeDescreased)*2;
                let clickCount = 0;
                note.addEventListener("click", () => {
                    clickCount++;
                    if (clickCount === 3) {
                        handleScore(type);
                        note.remove();
                        numberOfNotes--;
                        
                        if(numberOfNotes<=0){
                            clearInterval(timer);
                            level++;
                            document.getElementById("level").innerText = "Nivel: " + level;
                            clearAllNotes();
                            createLevel();
                        }
                    }
                });
                break;
            default:
                note.addEventListener("click", () => {
                    handleScore("normal");
                    note.remove();
                    numberOfNotes--;
                });
                break;
        }
        document.getElementById(num).appendChild(note);
    }
    document.getElementById("timer").innerText = ("Tiempo: " + timeRemaining.toFixed(1));
    timer = setInterval(() => {
        if (gameOver) {
            clearInterval(timer);
            return;
        }
        timeRemaining-=0.1;
        document.getElementById("timer").innerText = ("Tiempo: " + timeRemaining.toFixed(1));
        if (timeRemaining <= 0) {
            endGameState("GAME OVER: " + score);
            clearInterval(timer);
        }
    }, 100);
}

function typeSelector() {
    let prob = Math.random();
    /* All of these should add 0.5 */
    if (prob < 0.20) return "strong"; //20%
    if (prob < 0.50) return "wrong"; //30%

    return "normal"; // 50%
}

function createNote(type) {
    let note = document.createElement("button");
    note.className = type;
    styleNote(note, type);
    return note;
}

function styleNote(note, type) {
    switch (type) {
        case "strong":
            note.style.backgroundColor = "lightblue";
            break;
        case "wrong":
            note.style.backgroundColor = "red";
            note.innerText = "X";
            break;
        default:
            note.style.backgroundColor = "lightgray";
            break;
    }
}

function clearAllNotes() {
    document.querySelectorAll("#board button").forEach(button => button.remove());
}

function endGameState(message) {
    gameOver = true;
    document.getElementById("score").innerText = message;
    clearAllNotes();
    stopMusic();
}