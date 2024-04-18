import * as Storage from "./storage";
import * as Theme from "./theme";
import * as Difficulty from "./difficulty";
import * as Cursor from "./cursor";
import * as Settings from "./settings";
import * as Manager from "./manager";

let theme: number;
let difficulty: number;
let cursor: number;

let currentThemeSelection: number;
let currentDifficultySelection: number;
let currentCursorSelection: number;

export function closeClicked(): void {
    restoreSettings();
    Settings.closeModal();
}

export function applyClicked(): void {
    saveSettings();
    Settings.closeModal();
}

export function restoreSettings(): void {
    Settings.deselectButton(Settings.themeButtons[currentThemeSelection]);
    Settings.deselectButton(Settings.difficultyButtons[currentDifficultySelection]);
    Settings.deselectButton(Settings.cursorButtons[currentCursorSelection]);

    currentThemeSelection = theme;
    currentDifficultySelection = difficulty;
    currentCursorSelection = cursor;

    Settings.selectButton(Settings.themeButtons[currentThemeSelection]);
    Settings.selectButton(Settings.difficultyButtons[currentDifficultySelection]);
    Settings.selectButton(Settings.cursorButtons[currentCursorSelection]);

    themeHandler();
    difficultyHandler();
    cursorHandler();
}

export function getThemeSelection(): number {
    return currentThemeSelection;
}

export function getDifficultySelection(): number {
    return currentDifficultySelection;
}

export function getCursorSelection(): number {
    return currentCursorSelection;
}

export function setThemeSelection(value: number) {
    currentThemeSelection = value;
}

export function setDifficultySelection(value: number) {
    currentDifficultySelection = value;
}

export function setCursorSelection(value: number) {
    currentCursorSelection = value;
}

export function saveSettings(): void {
    saveTheme();
    saveDifficulty();
    saveCursor();
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

export function themeHandler(): void {
    Theme.changeTheme(currentThemeSelection);
}

export function difficultyHandler(): void {
    Difficulty.refreshTitle(currentDifficultySelection);
    Manager.difficultyChanged(currentDifficultySelection);
}

export function cursorHandler(): void {
    Cursor.updateCursor(currentCursorSelection);
}

function saveTheme(): void {
    theme = currentThemeSelection;
    Storage.setTheme(theme);
}

function saveDifficulty(): void {
    difficulty = currentDifficultySelection;
    Storage.setDifficulty(difficulty);
}

function saveCursor(): void {
    cursor = currentCursorSelection;
    Storage.setCursor(cursor);
}

export function init(): void {
    theme = Storage.getTheme();
    difficulty = Storage.getDifficulty();
    cursor = Storage.getCursor();
    currentThemeSelection = theme;
    currentDifficultySelection = difficulty;
    currentCursorSelection = cursor;
    Theme.init(theme);
    Difficulty.refreshTitle(difficulty);
    Cursor.init(cursor);
    Settings.init();
}
