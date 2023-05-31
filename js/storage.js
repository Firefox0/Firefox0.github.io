export default class Storage {
    static getHighscore(difficulty) {
        return Number(localStorage.getItem("highscore-" + difficulty));
    }

    static setHighscore(highscore, difficulty) {
        localStorage.setItem("highscore-" + difficulty, highscore);
    }

    static getDifficulty() {
        let difficulty = localStorage.getItem("difficulty");
        if (difficulty === null) {
            return difficulty;
        }
        return Number(difficulty);
    }

    static setDifficulty(difficulty) {
        localStorage.setItem("difficulty", difficulty);
    }
}
