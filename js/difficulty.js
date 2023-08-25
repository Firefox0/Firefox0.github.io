import Storage from "./storage.js";
import Title from "./title.js";

export default class Difficulty {
    static difficultyButtons = [
        document.getElementById("difficultyEasyButton"),
        document.getElementById("difficultyMediumButton"),
        document.getElementById("difficultyHardButton"),
        document.getElementById("difficultyRisteButton")
    ];
    static difficulty;
    static currentDifficultySelection;

    static initialize() {
        this.difficulty = Number(Storage.get("difficulty"));
        if (!this.difficulty > 0) {
            this.difficulty = 1;
        }
        this.currentDifficultySelection = this.difficulty;
        this.chooseButton(this.difficulty, this.difficulty);
        Title.refreshTitle(this.difficulty);

        for (let i = 0; i < this.difficultyButtons.length; i++) {
            this.difficultyButtons[i].onclick = () => {
                this.chooseButton(this.currentDifficultySelection, i);
                this.currentDifficultySelection = i;
            }
        }
    }

    static getDifficulty() {
        return this.difficulty;
    }

    static setDifficulty() {
        Storage.set("difficulty", this.difficulty);
    }

    static newDifficulty() {
        this.difficulty = this.currentDifficultySelection;
        this.setDifficulty();
    }

    static chooseButton(oldId, newId) {
        this.difficultyButtons[oldId].classList.remove("btn-chosen");
        this.difficultyButtons[newId].classList.add("btn-chosen");
    }

    static restoreButton() {
        this.chooseButton(this.currentDifficultySelection, this.difficulty);
        this.currentDifficultySelection = this.difficulty;
    }
}
