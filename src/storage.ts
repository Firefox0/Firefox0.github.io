const keys = {
    highscore: "highscore-",
    cursor: "cursor",
    difficulty: "difficulty",
    theme: "theme"
}

function get(key: string): string | null {
    return localStorage.getItem(key);
}

function set(key: string, value: string): void {
    localStorage.setItem(key, value);
}

function getNumber(key: string): number | null {
    let value: string | null = get(key);
    if (value === null) {
        return null;
    }
    return Number(value);
}

function setNumber(key: string, value: number): void {
    set(key, String(value));
}

export function getHighscore(difficulty: number): number {
    return getNumber(keys.highscore + difficulty) ?? 0;
}

export function setHighscore(highscore: number, difficulty: number): void {
    setNumber(keys.highscore + difficulty, highscore);
}

export function getCursor(): number {
    return getNumber(keys.cursor) ?? 1;
}

export function setCursor(value: number): void {
    setNumber(keys.cursor, value);
}

export function getDifficulty(): number {
    return getNumber(keys.difficulty) ?? 0;
}

export function setDifficulty(difficulty: number): void {
    setNumber(keys.difficulty, difficulty);
}

export function getTheme(): number {
    return getNumber(keys.theme) ?? 0;
}

export function setTheme(value: number): void {
    setNumber(keys.theme, value);
}
