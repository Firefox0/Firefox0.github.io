import * as Controller from "./controller";
import * as Settings from "./settings";
import * as Help from "./help";

const yesButton: HTMLElement= document.getElementById("yes")!;
const noButton: HTMLElement = document.getElementById("no")!;
const startButton: HTMLElement = document.getElementById("startButton")!;
const backButton: HTMLElement = document.getElementById("backButton")!;
const footer: HTMLElement = document.getElementById("footer")!;
const settingsButton: HTMLElement = document.getElementById("settingsButton")!;
const helpButton: HTMLElement = document.getElementById("helpButton")!;

export function enableDecisionButtons(): void {
    yesButton.removeAttribute("disabled");
    noButton.removeAttribute("disabled");
}

export function disableDecisionButtons(): void {
    yesButton.setAttribute("disabled", "");
    noButton.setAttribute("disabled", "");
}

export function showMainPage(): void {
    footer.classList.remove("d-none");
    backButton.classList.add("d-none");
    startButton.classList.remove("d-none");
    settingsButton.classList.remove("invisible");
    helpButton.classList.remove("d-none");
}

export function showGamePage(): void {
    footer.classList.add("d-none");
    startButton.classList.add("d-none");
    backButton.classList.remove("d-none");
    settingsButton.classList.add("invisible");
    helpButton.classList.add("d-none");
}

export function isYesDisabled(): boolean {
    return yesButton.hasAttribute("disabled");
}

export function isNoDisabled(): boolean {
    return noButton.hasAttribute("disabled");
}

export function yesClick(): void {
    yesButton.click();
}

export function noClick(): void {
    noButton.click();
}

export function startClick(): void {
    startButton.click();
}

export function startButtonVisible(): boolean {
    return !startButton.classList.contains("d-none");
}

(() => {
    yesButton.onclick = () => Controller.yesButtonClicked();
    noButton.onclick = () => Controller.noButtonClicked();
    startButton.onclick = () => Controller.startButtonClicked();
    backButton.onclick = () => Controller.backButtonClicked();
    settingsButton.onclick = () => Settings.settingsButtonClicked();
    helpButton.onclick = () => Help.helpButtonClicked();
})();
