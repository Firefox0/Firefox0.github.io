import * as Storage from "./storage";

let difficulty: number;

function initialize(): void {
    difficulty = Number(Storage.get("difficulty"));
    if (!(difficulty >= 0)) {
        difficulty = 1;
    }
}

export function getDifficulty(): number {
    return difficulty;
}

function setDifficulty(): void {
    Storage.set("difficulty", String(difficulty));
}

export function newDifficulty(value): void {
    difficulty = value;
    setDifficulty();
}

initialize();
