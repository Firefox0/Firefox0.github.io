export function get(key: string): string | null {
    return localStorage.getItem(key);
}

export function set(key: string, value: string): void {
    localStorage.setItem(key, value);
}

export function getHighscore(difficulty: number): number {
    return Number(localStorage.getItem("highscore-" + difficulty));
}

export function setHighscore(highscore: string, difficulty: string): void {
    localStorage.setItem("highscore-" + difficulty, highscore);
}
