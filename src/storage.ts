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

export function getHighscore(difficulty: number): number | null {
    return getNumber(keys.highscore + difficulty);
}

export function setHighscore(highscore: number, difficulty: number): void {
    setNumber(keys.highscore + difficulty, highscore);
}

export function getCursor(): number | null {
    return getNumber(keys.cursor);
}

export function setCursor(value: number): void {
    setNumber(keys.cursor, value);
}

export function getDifficulty(): number | null {
    return getNumber(keys.difficulty);
}

export function setDifficulty(difficulty: number): void {
    setNumber(keys.difficulty, difficulty);
}

export function getTheme(): number | null {
    return getNumber(keys.theme);
}

export function setTheme(value: number): void {
    setNumber(keys.theme, value);
}
