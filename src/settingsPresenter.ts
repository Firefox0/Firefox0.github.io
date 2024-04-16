import * as Storage from "./storage";
import * as Theme from "./theme";
import * as Difficulty from "./difficulty";
import * as Cursor from "./cursor";
import * as Settings from "./settings";

let theme: number;
let difficulty: number;
let cursor: number;

export function saveSettings(themeValue: number, difficultyValue: number, cursorValue: number): void {
    saveTheme(themeValue);
    saveDifficulty(difficultyValue);
    saveCursor(cursorValue);
}

export function getTheme(): number {
    return theme;
}

export function getDifficulty(): number {
    return difficulty;
}

export function getCursor(): number {
    return cursor;
}

export function themeHandler(value: number): void {
    Theme.changeTheme(value);
}

export function difficultyHandler(value: number): void {
    Difficulty.refreshTitle(value);
}

export function cursorHandler(value: number): void {
    Cursor.updateCursor(value);
}

function saveTheme(value: number): void {
    theme = value;
    Storage.setTheme(value);
}

function saveDifficulty(value: number): void {
    difficulty = value;
    Storage.setDifficulty(difficulty);
}

function saveCursor(value: number): void {
    cursor = value;
    Storage.setCursor(cursor);
}

export function init(): void {
    theme = Storage.getTheme() ?? 0;
    difficulty = Storage.getDifficulty() ?? 0;
    cursor = Storage.getCursor() ?? 1;
    Theme.init(theme);
    Difficulty.refreshTitle(difficulty);
    Cursor.init(cursor);
    Settings.init();
}
