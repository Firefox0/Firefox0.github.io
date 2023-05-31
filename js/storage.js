export default class Storage {
    static getHighscore() {
        return Number(localStorage.getItem("highscore"));
    }

    static setHighscore(highscore) {
        localStorage.setItem("highscore", highscore);
    }

    static getDifficulty() {
        return Number(localStorage.getItem("difficulty"));
    }

    static setDifficulty(difficulty) {
        localStorage.setItem("difficulty", difficulty);
    }
}
