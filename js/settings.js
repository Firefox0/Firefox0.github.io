import Storage from "./storage.js";
import Title from "./title.js";
import Score from "./score.js";

export default class Settings {
    static settingsButton = document.getElementById("settingsButton");
    static modal = document.getElementById("exampleModal");
    static modalCloseButton = document.getElementById("modalCloseButton");
    static difficultyButtons = [
        document.getElementById("difficultyEasyButton"),
        document.getElementById("difficultyMediumButton"),
        document.getElementById("difficultyHardButton"),
        document.getElementById("difficultyRisteButton")
    ];
    static applyButton = document.getElementById("modalApplyButton");
    static difficulty;
    static currentDifficultySelection;

    static {
        this.initializeButtons();
        let tempDifficulty = Storage.getDifficulty();
        if (tempDifficulty === null) {
            tempDifficulty = 1;
        }
        this.difficulty = tempDifficulty;
        this.currentDifficultySelection = tempDifficulty;
        this.chooseButton(this.difficulty, this.difficulty);
        Title.refreshTitle(this.difficulty);
    }

    static getDifficulty() {
        return this.difficulty;
    }

    static chooseButton(oldId, newId) {
        this.difficultyButtons[oldId].classList.remove("btn-chosen");
        this.difficultyButtons[newId].classList.add("btn-chosen");
    }

    static closeModal() {
        this.modal.classList.remove("show");
        this.modal.style.display = "";
    }

    static initializeButtons() {
        this.settingsButton.onclick = () => {
            this.modal.classList.add("show");
            this.modal.style.display = "block";
        }

        this.modalCloseButton.onclick = () => {
            this.closeModal();
            this.chooseButton(this.currentDifficultySelection, this.difficulty);
            this.currentDifficultySelection = this.difficulty;
        }

        for (let i = 0; i < this.difficultyButtons.length; i++) {
            this.difficultyButtons[i].onclick = () => {
                this.chooseButton(this.currentDifficultySelection, i);
                this.currentDifficultySelection = i;
            }
        }

        this.applyButton.onclick = () => {
            this.difficulty = this.currentDifficultySelection;
            Storage.setDifficulty(this.difficulty);
            Title.refreshTitle(this.difficulty);
            Score.loadHighscore();
            this.closeModal();
        }
    }
    
    static showButton() {
        this.settingsButton.style.visibility = "visible";
    }
    
    static hideButton() {
        this.settingsButton.style.visibility = "hidden";
    }
}
