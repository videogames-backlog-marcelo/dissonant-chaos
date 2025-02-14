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