import * as SettingsManager from "./settingsManager";
import * as Animations from "./animations";

export const themeButtons: NodeListOf<HTMLElement> = document.querySelectorAll("div#themeButtons img")!;
export const difficultyButtons: NodeListOf<HTMLElement> = document.querySelectorAll("div#difficultyButtons img")!;
export const cursorButtons: NodeListOf<HTMLElement> = document.querySelectorAll("div#cursorButtons img")!;

const modal: HTMLElement = document.getElementById("exampleModal")!;
const modalCloseButton: HTMLElement = document.getElementById("modalCloseButton")!;
const applyButton: HTMLElement = document.getElementById("modalApplyButton")!;

export function settingsButtonClicked() {
    modal.classList.add("show");
    modal.style.display = "block";
}

export function selectButton(button: HTMLElement): void {
    button.style.borderColor = "white";
    Animations.settingsContentActivate(button).play();
}

export function deselectButton(button: HTMLElement): void {
    button.style.borderColor = "";
    Animations.settingsContentDeactivate(button).play();
}

export function init(): void {    
    selectButton(themeButtons[SettingsManager.getTheme()]);
    selectButton(difficultyButtons[SettingsManager.getDifficulty()]);
    selectButton(cursorButtons[SettingsManager.getCursor()]);
    
    initializeButtons();
}

export function closeModal(): void {
    modal.classList.remove("show");
    modal.style.display = "";
}

function initializeButtons(): void {
    modalCloseButton.onclick = SettingsManager.closeClicked;

    applyButton.onclick = SettingsManager.applyClicked;

    buttonsInit(themeButtons, SettingsManager.getThemeSelection, 
                SettingsManager.setThemeSelection, SettingsManager.themeHandler);

    buttonsInit(difficultyButtons, SettingsManager.getDifficultySelection,
                SettingsManager.setDifficultySelection, SettingsManager.difficultyHandler);

    buttonsInit(cursorButtons, SettingsManager.getCursorSelection,
                SettingsManager.setCursorSelection, SettingsManager.cursorHandler);
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
