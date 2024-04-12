import * as Title from "./title";
import * as Score from "./score";
import * as Difficulty from "./difficulty";
import * as Theme from "./theme";
import * as Cursor from "./cursor";

const modal: HTMLElement = document.getElementById("exampleModal")!;
const modalCloseButton: HTMLElement = document.getElementById("modalCloseButton")!;
const applyButton: HTMLElement = document.getElementById("modalApplyButton")!;
const themeButtons: NodeListOf<HTMLElement> = document.querySelectorAll("div#themeButtons img")!;
const difficultyButtons: NodeListOf<HTMLElement> = document.querySelectorAll("div#difficultyButtons img")!;
const cursorButtons: NodeListOf<HTMLElement> = document.querySelectorAll("div#cursorButtons img")!;

interface Selector {
    [value: string]: number
}

let currentThemeSelection: Selector = {value: -1};
let currentDifficultySelection: Selector = {value: -1};
let currentCursorSelection: Selector = {value: -1};
let tempSettings: number[] = [];

export function settingsButtonClicked() {
    modal.classList.add("show");
    modal.style.display = "block";
}

function closeModal(): void {
    modal.classList.remove("show");
    modal.style.display = "";
}

function initializeButtons(): void {
    modalCloseButton.onclick = () => {
        restoreSettings();
        closeModal();
    }

    applyButton.onclick = () => {
        saveSettings();
        backupSettings();
        Score.loadHighscore();
        closeModal();
    }

    buttonsInit(themeButtons, currentThemeSelection, () => {
        themeHandler();
    });

    buttonsInit(difficultyButtons, currentDifficultySelection, () => {
        difficultyHandler();
    });

    buttonsInit(cursorButtons, currentCursorSelection, () => {
        cursorHandler();
    });

}

function buttonsInit(buttons: NodeListOf<HTMLElement>, currentSelectionObject: Selector, 
                     callback: Function): void {
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].onclick = () => {
            deselectButton(buttons, currentSelectionObject.value);
            selectButton(buttons, i);
            currentSelectionObject.value = i;
            callback();
        }
    }
}

function selectButton(buttons: any, index: number): void {
    buttons[index].style.borderColor = "white";
}

function deselectButton(buttons: any, index: number): void {
    buttons[index].style.borderColor = "";
}

function backupSettings(): void {
    tempSettings = [
        currentThemeSelection.value,
        currentDifficultySelection.value,
        currentCursorSelection.value
    ];
}

function saveSettings(): void {
    Theme.saveTheme();
    Difficulty.saveDifficulty();
    Cursor.saveCursor();
}

function restoreSettings(): void {
    deselectButton(themeButtons, currentThemeSelection.value);
    deselectButton(difficultyButtons, currentDifficultySelection.value);
    deselectButton(cursorButtons, currentCursorSelection.value);

    [currentThemeSelection.value, 
    currentDifficultySelection.value,
    currentCursorSelection.value] = tempSettings;

    selectButton(themeButtons, currentThemeSelection.value);
    selectButton(difficultyButtons, currentDifficultySelection.value);
    selectButton(cursorButtons, currentCursorSelection.value);

    themeHandler();
    difficultyHandler();
    cursorHandler();
}

function themeHandler(): void {
    Theme.changeTheme(currentThemeSelection.value);
}

function difficultyHandler(): void {
    Title.refreshTitle(currentDifficultySelection.value);
    Difficulty.newDifficulty(currentDifficultySelection.value);
}

function cursorHandler(): void {
    Cursor.updateCursor(currentCursorSelection.value);
}

(() => {
    currentThemeSelection.value = Theme.getTheme();
    currentDifficultySelection.value = Difficulty.getDifficulty();
    currentCursorSelection.value = Cursor.getCursor();
    
    selectButton(themeButtons, currentThemeSelection.value);
    selectButton(difficultyButtons, currentDifficultySelection.value);
    selectButton(cursorButtons, currentCursorSelection.value);

    backupSettings();
    initializeButtons();
})();
