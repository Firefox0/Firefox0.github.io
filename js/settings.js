import Title from "./title.js";
import Score from "./score.js";
import Difficulty from "./difficulty.js";
import Theme from "./theme.js";

export default class Settings {
    static settingsButton = document.getElementById("settingsButton");
    static modal = document.getElementById("exampleModal");
    static modalCloseButton = document.getElementById("modalCloseButton");
    static applyButton = document.getElementById("modalApplyButton");

    static {
        this.initializeButtons();
        Difficulty.initialize();
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
            Difficulty.restoreButton();
        }

        this.applyButton.onclick = () => {
            Difficulty.newDifficulty();
            Title.refreshTitle(Difficulty.getDifficulty());
            Score.loadHighscore();
            this.closeModal();
        }
    }
    
    static showButton() {
        this.settingsButton.classList.remove("invisible");
    }
    
    static hideButton() {
        this.settingsButton.classList.add("invisible");
    }
}
