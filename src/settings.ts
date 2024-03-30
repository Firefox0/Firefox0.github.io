import * as Title from "./title";
import * as Score from "./score";
import * as Difficulty from "./difficulty";
import * as Theme from "./theme";
import * as Cursor from "./cursor";

const settingsButton: HTMLElement = document.getElementById("settingsButton")!;
const modal: HTMLElement = document.getElementById("exampleModal")!;
const modalCloseButton: HTMLElement = document.getElementById("modalCloseButton")!;
const applyButton: HTMLElement = document.getElementById("modalApplyButton")!;

interface Selector {
    [value: string]: number
}

let currentThemeSelection: Selector = {value: -1};
let currentDifficultySelection: Selector = {value: -1};
let currentCursorSelection: Selector = {value: -1};

let tempSettings: number[] = [];

const difficultyButtons: HTMLElement[] = [
    document.getElementById("difficultyEasyButton")!,
    document.getElementById("difficultyMediumButton")!,
    document.getElementById("difficultyHardButton")!,
    document.getElementById("difficultyRisteButton")!
];

const themeButtons: HTMLElement[] = [
    document.getElementById("themeNordRegular")!,
    document.getElementById("themeNordDark")!
];

const cursorButtons: HTMLElement[] = [
    document.getElementById("cursorLegacy")!,
    document.getElementById("cursorModern")!
]

function closeModal(): void {
    modal.classList.remove("show");
    modal.style.display = "";
}

function initializeButtons(): void {
    settingsButton.onclick = () => {
        modal.classList.add("show");
        modal.style.display = "block";
    }

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

function buttonsInit(buttons: HTMLElement[], currentSelectionObject: Selector, 
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

function selectButton(buttons: HTMLElement[], index: number): void {
    buttons[index].classList.add("btn-chosen");
}

function deselectButton(buttons: HTMLElement[], index: number): void {
    buttons[index].classList.remove("btn-chosen");
}

export function showButton(): void {
    settingsButton.classList.remove("invisible");
}

export function hideButton(): void {
    settingsButton.classList.add("invisible");
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
    selectButton(themeButtons, currentThemeSelection.value);

    currentDifficultySelection.value = Difficulty.getDifficulty();
    selectButton(difficultyButtons, currentDifficultySelection.value);

    currentCursorSelection.value = Cursor.getCursor();
    selectButton(cursorButtons, currentCursorSelection.value);

    backupSettings();

    initializeButtons();
})();
