export function get(key: string): string | null {
    return localStorage.getItem(key);
}

export function set(key: string, value: string): void {
    localStorage.setItem(key, value);
}

export function getNumber(key: string): number | null {
    let value: string | null = get(key);
    if (value === null) {
        return null;
    }
    return Number(value);
}

export function getHighscore(difficulty: number): number | null {
    return getNumber("highscore-" + difficulty);
}

export function setHighscore(highscore: number, difficulty: string): void {
    set("highscore-" + difficulty, String(highscore));
}

export function getCursor(): number | null {
    return getNumber("cursor");
}

export function setCursor(value: number): void {
    set("cursor", String(value));
}
