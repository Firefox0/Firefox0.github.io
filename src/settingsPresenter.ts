import * as Storage from "./storage";
import * as Difficulty from "./difficulty";

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
    difficulty = Storage.getDifficulty() ?? 0;
    Difficulty.refreshTitle(difficulty);
})();
