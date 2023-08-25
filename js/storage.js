export default class Storage {
    static get(key) {
        return localStorage.getItem(key);
    }
    
    static set(key, value) {
        localStorage.setItem(key, value);
    }

    static getHighscore(difficulty) {
        return Number(localStorage.getItem("highscore-" + difficulty));
    }

    static setHighscore(highscore, difficulty) {
        localStorage.setItem("highscore-" + difficulty, highscore);
    }
}
