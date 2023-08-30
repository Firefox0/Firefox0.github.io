import Storage from "./storage.js";

export default class Difficulty {

    static difficulty;

    static initialize() {
        this.difficulty = Number(Storage.get("difficulty"));
        if (!(this.difficulty >= 0)) {
            this.difficulty = 1;
        }
        return this.difficulty;
    }

    static getDifficulty() {
        return this.difficulty;
    }

    static setDifficulty() {
        Storage.set("difficulty", this.difficulty);
    }

    static newDifficulty(difficulty) {
        this.difficulty = difficulty;
        this.setDifficulty();
    }
}
