export default class Title {
    static title = document.getElementById("title");

    static difficultyToText(difficulty) {
        switch (difficulty) {
            case 0:
                return "QMaxGaren";
            case 1:
                return "Medium";
            case 2:
                return "Riste";
            case 3:
                return "Erislash";
        }
    }

    static refreshTitle(difficulty) {
        this.title.innerText = `Garen Ult Trainer (${this.difficultyToText(difficulty)})`;
    }
}
