export default class Score {

    static highscoreElement = document.getElementById("highscore");
    static highscore = 0;
    static currentScore = 0;
    static scoreElement = document.getElementById("score");
    static resetCounter = 0;

    static {
        document.getElementById("resetHighscoreButton").onclick = () => this.resetHighscore();
    }

    static saveHighscore() {
        localStorage.setItem("highscore", this.highscore);
    }

    static loadHighscore() {
        let highscore = localStorage.getItem("highscore");
        if (highscore === null) {
            highscore = 0;
        }
        this.updateHighscore(highscore);
    }

    static resetHighscore() {
        this.resetCounter++;
        if (this.resetCounter === 10) {
            this.newHighScore(Number.MAX_VALUE);
            return;
        }

        if (this.highscore === 0) {
            return;
        }
        this.newHighScore(0);
    }

    static newHighScore(newHighScore) {
        this.updateHighscore(newHighScore);
        this.saveHighscore();
    }

    static updateScore(newScore) {
        this.currentScore = newScore;
        this.scoreElement.innerText = newScore;
    }

    static updateHighscore(newHighscore) {
        this.highscore = newHighscore;
        this.highscoreElement.innerText = this.highscore;
    }
}
