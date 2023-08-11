import Animations from "./animations.js";
import Storage from "./storage.js";
import Settings from "./settings.js";

export default class Score {

    static highscoreElement = document.getElementById("highscore");
    static resetButton = document.getElementById("resetHighscoreButton");
    static highscore = 0;
    static currentScore = 0;
    static scoreElement = document.getElementById("score");
    static scoreAnimation = null;
    static highscoreAnimation = null;

    static {
        document.getElementById("resetHighscoreButton").onclick = () => this.resetHighscore();
        this.scoreAnimation = Animations.upAndDown(this.scoreElement);
        this.highscoreAnimation = Animations.upAndDown(this.highscoreElement);
        this.loadHighscore();
    }

    static loadHighscore() {
        let highscore = Storage.getHighscore(Settings.getDifficulty());
        if (highscore === null || highscore == 0) {
            highscore = 0;
        }

        this.updateHighscore(highscore);
    }

    static resetHighscore() {
        if (this.highscore === 0) {
            return;
        }

        this.updateHighscore(0);
        this.toggleButton();
    }

    static updateScore(newScore) {
        this.currentScore = newScore;
        this.scoreElement.innerText = newScore;
        this.scoreAnimation.play();
    }

    static updateHighscore(score) {
        if (score === undefined) {
            score = this.currentScore;
        }

        this.highscore = score;
        this.highscoreElement.innerText = score;
        this.highscoreAnimation.play();
        if (this.highscore > 0) {
            this.enableButton();
        } else {
            this.disableButton();
        }
        Storage.setHighscore(score, Settings.getDifficulty());
    }

    static enableButton() {
        this.resetButton.removeAttribute("disabled");
    }

    static disableButton() {
        this.resetButton.setAttribute("disabled", "");
    }
}
