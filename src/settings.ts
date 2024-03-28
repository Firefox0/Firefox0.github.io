import * as Title from "./title";
import * as Score from "./score";
import * as Difficulty from "./difficulty";
import * as Theme from "./theme";
import * as Cursor from "./cursor";

let settingsButton: HTMLElement = document.getElementById("settingsButton")!;
let modal: HTMLElement = document.getElementById("exampleModal")!;
let modalCloseButton: HTMLElement = document.getElementById("modalCloseButton")!;
let applyButton: HTMLElement = document.getElementById("modalApplyButton")!;

interface Selector {
    [value: string]: number
}

let currentThemeSelection: Selector = {value: -1};
let currentDifficultySelection: Selector = {value: -1};
let currentCursorSelection: Selector = {value: 0};

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
        closeModal();
    }

    applyButton.onclick = () => {
        Score.loadHighscore();
        closeModal();
    }

    buttonsInit(themeButtons, currentThemeSelection, () => {
        Theme.changeTheme(currentThemeSelection.value);
    });
    buttonsInit(difficultyButtons, currentDifficultySelection, () => {
        Difficulty.newDifficulty(currentDifficultySelection.value);
        Title.refreshTitle(Difficulty.getDifficulty());
    });
    buttonsInit(cursorButtons, currentCursorSelection, () => {
        Cursor.updateCursor(currentCursorSelection.value);
    });
}

function buttonsInit(buttons: HTMLElement[], currentSelectionObject: Selector, callback: Function) {
    console.log(buttons);
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].onclick = () => {
            buttons[currentSelectionObject.value].classList.remove("btn-chosen");
            buttons[i].classList.add("btn-chosen");
            currentSelectionObject.value = i;
            callback();
        }
    }
}

function chooseButton(buttons: HTMLElement[], index: number) {
    buttons[index].classList.add("btn-chosen");
}

export function showButton() {
    settingsButton.classList.remove("invisible");
}

export function hideButton() {
    settingsButton.classList.add("invisible");
}

(() => {
    currentDifficultySelection.value = Difficulty.getDifficulty();
    chooseButton(difficultyButtons, currentDifficultySelection.value);
    Title.refreshTitle(currentDifficultySelection.value);
    currentThemeSelection.value = Theme.initialize();
    chooseButton(themeButtons, currentThemeSelection.value);
    initializeButtons();
})();
