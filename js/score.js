import Animations from "./animations.js";
import Storage from "./storage.js";
import Settings from "./settings.js";

export default class Score {

    static highscoreElement = document.getElementById("highscore");
    static highscoreButton = document.getElementById("resetHighscoreButton");
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

        this.forceUpdateHighscore(highscore);
    }

    static resetHighscore() {
        if (this.highscore === 0) {
            return;
        }

        this.newHighScore(0);
        this.toggleButton();
    }

    static newHighScore() {
        if (this.highscore >= this.currentScore) {
            return;
        }
        this.updateHighscore();
        Storage.setHighscore(this.highscore, Settings.getDifficulty());
    }

    static updateScore(newScore) {
        this.currentScore = newScore;
        this.scoreElement.innerText = newScore;
        this.scoreAnimation.play();
    }

    static forceUpdateHighscore(highscore) {
        this.highscore = highscore;
        this.highscoreElement.innerText = highscore;
        this.highScoreUI();
    }

    static updateHighscore() {
        this.highscore = this.currentScore;
        this.highscoreElement.innerText = this.currentScore;
        this.highScoreUI();
    }

    static highScoreUI() {
        this.highscoreAnimation.play();
        if (this.highscore > 0) {
            this.toggleButton();
        }
    }

    static toggleButton() {
        this.highscoreButton.toggleAttribute("disabled");
    }
}
