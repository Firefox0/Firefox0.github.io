import * as SettingsPresenter from "./settingsPresenter";
import * as Score from "./score";
import * as Animations from "./animations";

const modal: HTMLElement = document.getElementById("exampleModal")!;
const modalCloseButton: HTMLElement = document.getElementById("modalCloseButton")!;
const applyButton: HTMLElement = document.getElementById("modalApplyButton")!;
export const themeButtons: NodeListOf<HTMLElement> = document.querySelectorAll("div#themeButtons img")!;
export const difficultyButtons: NodeListOf<HTMLElement> = document.querySelectorAll("div#difficultyButtons img")!;
export const cursorButtons: NodeListOf<HTMLElement> = document.querySelectorAll("div#cursorButtons img")!;

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
        Score.loadHighscore();
        closeModal();
    }

    buttonsInit(themeButtons, SettingsPresenter.getThemeSelection, 
                SettingsPresenter.setThemeSelection, SettingsPresenter.themeHandler);

    buttonsInit(difficultyButtons, SettingsPresenter.getDifficultySelection,
                SettingsPresenter.setDifficultySelection, SettingsPresenter.difficultyHandler);

    buttonsInit(cursorButtons, SettingsPresenter.getCursorSelection,
                SettingsPresenter.setCursorSelection, SettingsPresenter.cursorHandler);
}

function buttonsInit(buttons: NodeListOf<HTMLElement>, getCallback: Function,
                    setCallback: Function, callback: Function): void {
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].onclick = () => {
            let currentSelection: number = getCallback();
            if (currentSelection === i) {
                return;
            }
            deselectButton(buttons[currentSelection]);
            selectButton(buttons[i]);
            setCallback(i);
            callback();
        }
    }
}

export function selectButton(button: HTMLElement): void {
    button.style.borderColor = "white";
    Animations.settingsContentActivate(button).play();
}

export function deselectButton(button: HTMLElement): void {
    button.style.borderColor = "";
    Animations.settingsContentDeactivate(button).play();
}

function saveSettings(): void {
    SettingsPresenter.saveSettings();
}

function restoreSettings(): void {
    SettingsPresenter.restoreSettings();
}

export function init(): void {    
    selectButton(themeButtons[SettingsPresenter.getTheme()]);
    selectButton(difficultyButtons[SettingsPresenter.getDifficulty()]);
    selectButton(cursorButtons[SettingsPresenter.getCursor()]);
    
    initializeButtons();
}
