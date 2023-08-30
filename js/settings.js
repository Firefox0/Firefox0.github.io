import Title from "./title.js";
import Score from "./score.js";
import Difficulty from "./difficulty.js";
import Theme from "./theme.js";

export default class Settings {
    static settingsButton = document.getElementById("settingsButton");
    static modal = document.getElementById("exampleModal");
    static modalCloseButton = document.getElementById("modalCloseButton");
    static applyButton = document.getElementById("modalApplyButton");
    static currentThemeSelection;
    static currentDifficultySelection;

    static difficultyButtons = [
        document.getElementById("difficultyEasyButton"),
        document.getElementById("difficultyMediumButton"),
        document.getElementById("difficultyHardButton"),
        document.getElementById("difficultyRisteButton")
    ];

    static themeButtons = [
        document.getElementById("themeNordRegular"),
        document.getElementById("themeNordDark")
    ];

    static {
        this.currentDifficultySelection = Difficulty.initialize();
        this.chooseDifficultyButton(this.currentDifficultySelection);
        Title.refreshTitle(this.currentDifficultySelection);
        this.currentThemeSelection = Theme.initialize();
        this.chooseThemeButton(this.currentThemeSelection);
        this.initializeButtons();
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
        }

        this.applyButton.onclick = () => {
            Difficulty.newDifficulty(this.currentDifficultySelection);
            Theme.changeTheme(this.currentThemeSelection);
            Title.refreshTitle(Difficulty.getDifficulty());
            Score.loadHighscore();
            this.closeModal();
        }

        for (let i = 0; i < this.difficultyButtons.length; i++) {
            this.difficultyButtons[i].onclick = () => {
                this.chooseDifficultyButton(i);
                this.currentDifficultySelection = i;
            }
        }

        for (let i = 0; i < this.themeButtons.length; i++) {
            this.themeButtons[i].onclick = () => {
                this.chooseThemeButton(i);
                this.currentThemeSelection = i;
            }
        }
    }
    
    static chooseDifficultyButton(id) {
        this.difficultyButtons[this.currentDifficultySelection].classList.remove("btn-chosen");
        this.difficultyButtons[id].classList.add("btn-chosen");
    }
    
    static chooseThemeButton(id) {
        this.themeButtons[this.currentThemeSelection].classList.remove("btn-chosen");
        this.themeButtons[id].classList.add("btn-chosen");
    }

    static showButton() {
        this.settingsButton.classList.remove("invisible");
    }
    
    static hideButton() {
        this.settingsButton.classList.add("invisible");
    }
}
