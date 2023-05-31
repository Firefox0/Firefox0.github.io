export default class Title {
    static title = document.getElementById("title");

    static difficultyToText(difficulty) {
        switch (difficulty) {
            case 0:
                return "Easy";
            case 1:
                return "Medium";
            case 2:
                return "Hard";
            case 3:
                return "Riste";
        }
    }

    static refreshTitle(difficulty) {
        this.title.innerText = `Garen Ult Trainer (${this.difficultyToText(difficulty)})`;
    }
}
