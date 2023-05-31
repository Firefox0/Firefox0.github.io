export default class Storage {
    static getHighscore(difficulty) {
        return Number(localStorage.getItem("highscore-" + difficulty));
    }

    static setHighscore(highscore, difficulty) {
        localStorage.setItem("highscore-" + difficulty, highscore);
    }

    static getDifficulty() {
        return Number(localStorage.getItem("difficulty"));
    }

    static setDifficulty(difficulty) {
        localStorage.setItem("difficulty", difficulty);
    }
}
