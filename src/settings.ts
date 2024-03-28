import * as Title from "./title";
import * as Score from "./score";
import * as Difficulty from "./difficulty";
import * as Theme from "./theme";

let settingsButton: HTMLElement = document.getElementById("settingsButton")!;
let modal: HTMLElement = document.getElementById("exampleModal")!;
let modalCloseButton: HTMLElement = document.getElementById("modalCloseButton")!;
let applyButton: HTMLElement = document.getElementById("modalApplyButton")!;
let currentThemeSelection;
let currentDifficultySelection;

let difficultyButtons: HTMLElement[] = [
    document.getElementById("difficultyEasyButton")!,
    document.getElementById("difficultyMediumButton")!,
    document.getElementById("difficultyHardButton")!,
    document.getElementById("difficultyRisteButton")!
];

let themeButtons: HTMLElement[] = [
    document.getElementById("themeNordRegular")!,
    document.getElementById("themeNordDark")!
];

function initialize() {
    currentDifficultySelection = Difficulty.getDifficulty();
    chooseDifficultyButton(currentDifficultySelection);
    Title.refreshTitle(currentDifficultySelection);
    currentThemeSelection = Theme.initialize();
    chooseThemeButton(currentThemeSelection);
    initializeButtons();
}

function closeModal() {
    modal.classList.remove("show");
    modal.style.display = "";
}

function initializeButtons() {
    settingsButton.onclick = () => {
        modal.classList.add("show");
        modal.style.display = "block";
    }

    modalCloseButton.onclick = () => {
        closeModal();
    }

    applyButton.onclick = () => {
        console.log("HERE");
        Difficulty.newDifficulty(currentDifficultySelection);
        Theme.changeTheme(currentThemeSelection);
        Title.refreshTitle(Difficulty.getDifficulty());
        Score.loadHighscore();
        closeModal();
    }

    for (let i = 0; i < difficultyButtons.length; i++) {
        difficultyButtons[i].onclick = () => {
            chooseDifficultyButton(i);
        }
    }

    for (let i = 0; i < themeButtons.length; i++) {
        themeButtons[i].onclick = () => {
            chooseThemeButton(i);
            currentThemeSelection = i;
        }
    }
}

function chooseDifficultyButton(id) {
    console.log("INside chosen difficulty button with i:", id);
    difficultyButtons[currentDifficultySelection].classList.remove("btn-chosen");
    difficultyButtons[id].classList.add("btn-chosen");
    currentDifficultySelection = id;
}

function chooseThemeButton(id) {
    themeButtons[currentThemeSelection].classList.remove("btn-chosen");
    themeButtons[id].classList.add("btn-chosen");
}

export function showButton() {
    settingsButton.classList.remove("invisible");
}

export function hideButton() {
    settingsButton.classList.add("invisible");
}

initialize();
