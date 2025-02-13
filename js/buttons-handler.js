let newNote;
let newWrongNote;

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

function setNote(){
    let newNoteType = Math.random();
    if(newNoteType <= 0.1) {
        clearAllNotes();
        setSequenceNote();
    }
    else setNormalNote();
}

function setNormalNote() {
    if (gameOver) return;

    let isButtonClicked = false;
    let probability = Math.random();
    let type = setType(probability);
    let timeRemaining = setTimeRemaining(type);

    let note = createNote(timeRemaining, type);
    let num = getRandomTile();
    if(newNote && newNote.id == num){
        return;
    }
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

    switch(type){
        case "normal":
            note.addEventListener("click", () => {
                handleScore("normal");
                note.remove();
                isButtonClicked = true;
            });
            break;
        case "strong":
            let clickCount = 0;
            note.addEventListener("click", () => {
                clickCount++;
                if (clickCount === 3) {
                    handleScore("strong");
                    note.remove();
                    isButtonClicked = true;
                }
            });
            break;
        default:
            note.addEventListener("click", () => {
                handleScore("normal");
                note.remove();
                isButtonClicked = true;
            });
            break;
    }
}

function setTimeRemaining(type){
    switch(type){
        case "normal": return 3;
        case "strong": return 5;
        default: return 3;
    }
}

function setType(probability){
    if(probability > 0.1 && probability <= 0.3) return "strong";
    return "normal";
}

function setWrongNote() {
    if (gameOver) return;
    if (newWrongNote) {
        newWrongNote.innerHTML = "";
    }
    let note = createNote("X", "wrong");
    const randomTile = getRandomTile();
    newWrongNote = document.getElementById(randomTile);
    newWrongNote.appendChild(note);
}

function clearAllNotes() {
    document.querySelectorAll("#board button").forEach(button => button.remove());
}

function setSequenceNote() {
    if (gameOver) return;

    let sequenceSize = Math.floor(Math.random() * 4) + 3;
    let sequenceTiles = [];
    let correctOrder = [];
    let currentIndex = 0;

    for (let i = 0; i < sequenceSize; i++) {
        let num = getRandomTile();
        while (sequenceTiles.includes(num)) {
            num = getRandomTile();
        }
        sequenceTiles.push(num);

        let note = document.createElement("button");
        note.className = "sequence";
        styleNote(note, "sequence");
        note.innerText = i + 1;
        correctOrder.push(note);

        let tile = document.getElementById(num);
        tile.appendChild(note);

        note.addEventListener("click", () => {
            if (note === correctOrder[currentIndex]) {
                currentIndex++;
                note.remove();

                if (currentIndex === sequenceSize) {
                    handleScore("sequence", sequenceSize);
                }
            }
        });
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
        case "sequence":
            note.style.backgroundColor = "orange";
            break;
        default:
            note.style.backgroundColor = "lightgray";
            break;
    }
}