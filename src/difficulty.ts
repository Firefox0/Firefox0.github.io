import * as Storage from "./storage";

let difficulty: number;

export function getDifficulty(): number {
    return difficulty;
}

function setDifficulty(): void {
    Storage.setDifficulty(difficulty);
}

export function newDifficulty(value): void {
    difficulty = value;
    setDifficulty();
}

(() => {
    difficulty = Number(Storage.getDifficulty());
    if (!(difficulty >= 0)) {
        difficulty = 1;
    }
})();
