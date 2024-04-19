import * as Manager from "./manager";
import * as Animations from "./animations";

export const difficultyButtons: NodeListOf<HTMLElement> = document.querySelectorAll("div#difficultyButtons img")!;
export const themeButtons: NodeListOf<HTMLElement> = document.querySelectorAll("div#themeButtons img")!;
export const cursorButtons: NodeListOf<HTMLElement> = document.querySelectorAll("div#cursorButtons img")!;

const modal: HTMLElement = document.getElementById("exampleModal")!;
const modalCloseButton: HTMLElement = document.getElementById("modalCloseButton")!;
const applyButton: HTMLElement = document.getElementById("modalApplyButton")!;

export function isSettingsDisplayed(): boolean {
    return modal.classList.contains("show");
}

export function settingsButtonClicked() {
    modal.classList.add("show");
    modal.style.display = "block";
}

export function selectButton(button: HTMLElement, color?: string): void {
    if (color === undefined) {
        color = "white";
    }
    button.style.borderColor = color;
    Animations.settingsContentActivate(button).play();
}

export function deselectButton(button: HTMLElement): void {
    button.style.borderColor = "";
    Animations.settingsContentDeactivate(button).play();
}

export function init(): void {    
    selectButton(themeButtons[Manager.getTheme()]);
    selectButton(difficultyButtons[Manager.getDifficulty()]);
    selectButton(cursorButtons[Manager.getCursor()]);
    
    initializeButtons();
}

export function closeModal(): void {
    modal.classList.remove("show");
    modal.style.display = "";
}

function initializeButtons(): void {
    modalCloseButton.onclick = Manager.closeClicked;

    applyButton.onclick = Manager.applyClicked;

    buttonsInit(difficultyButtons, (i) => {
        Manager.selectNewDifficultyButton(i);
    });

    buttonsInit(themeButtons, (i) => {
        Manager.selectNewThemeButton(i);
    });

    buttonsInit(cursorButtons, (i) => {
        Manager.selectNewCursorButton(i);
    });
}

function buttonsInit(buttons: NodeListOf<HTMLElement>, callback: Function): void {
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].onclick = () => {
            callback(i);
        }
    }
}
