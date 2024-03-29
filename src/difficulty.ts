import * as Storage from "./storage";
import * as Title from "./title";

let difficulty: number;

export function getDifficulty(): number {
    return difficulty;
}

export function saveDifficulty(): void {
    Storage.setDifficulty(difficulty);
}

export function newDifficulty(value): void {
    difficulty = value;
    saveDifficulty();
}

(() => {
    difficulty = Number(Storage.getDifficulty());
    if (!(difficulty >= 0)) {
        difficulty = 1;
    }
    Title.refreshTitle(difficulty);
})();
