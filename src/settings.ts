import * as SettingsPresenter from "./settingsPresenter";
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
    selectButton(themeButtons[SettingsPresenter.getTheme()]);
    selectButton(difficultyButtons[SettingsPresenter.getDifficulty()]);
    selectButton(cursorButtons[SettingsPresenter.getCursor()]);
    
    initializeButtons();
}

export function closeModal(): void {
    modal.classList.remove("show");
    modal.style.display = "";
}

function initializeButtons(): void {
    modalCloseButton.onclick = SettingsPresenter.closeClicked;

    applyButton.onclick = SettingsPresenter.applyClicked;

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
