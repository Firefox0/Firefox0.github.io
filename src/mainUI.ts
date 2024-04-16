import * as Controller from "./controller";
import * as Settings from "./settings";
import * as Help from "./help";
import * as Animations from "./animations";

const yesButton: HTMLElement= document.getElementById("yes")!;
const noButton: HTMLElement = document.getElementById("no")!;
const startButton: HTMLElement = document.getElementById("startButton")!;
const backButton: HTMLElement = document.getElementById("backButton")!;
const footer: HTMLElement = document.getElementById("footer")!;
const settingsButton: HTMLElement = document.getElementById("settingsButton")!;
const helpButton: HTMLElement = document.getElementById("helpButton")!;
const explanationButton: HTMLElement = document.getElementById("explanationButton")!;
const explanationRow: HTMLElement = document.getElementById("explanationRow")!;
const explanationTextElement: HTMLElement = document.getElementById("explanationText")!;

let executeYesAnimation: Animation;
let executeNoAnimation: Animation;

export function showExplanation(): void {
    explanationRow.classList.remove("d-none");
}

export function hideExplanation(): void {
    explanationRow.classList.add("d-none");
}

export function explanationClick(): void {
    explanationButton.click();
}

export function explanationVisible(): boolean {
    return !explanationRow.classList.contains("d-none");
}

export function updateExplanation(text: string): void {
    explanationTextElement.innerHTML = text;
}

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

export function backButtonVisible(): boolean {
    return !backButton.classList.contains("d-none");
}

(() => {
    disableDecisionButtons();
    executeYesAnimation = Animations.inAndOut(yesButton);
    executeNoAnimation = Animations.inAndOut(noButton);
    yesButton.onclick = () => {
        executeYesAnimation.play();
        Controller.yesButtonClicked();
    }
    noButton.onclick = () => {
        executeNoAnimation.play();
        Controller.noButtonClicked();
    }
    startButton.onclick = () => Controller.startButtonClicked();
    backButton.onclick = () => Controller.backButtonClicked();
    settingsButton.onclick = () => Settings.settingsButtonClicked();
    helpButton.onclick = () => Help.helpButtonClicked();
    explanationButton.onclick = () => Controller.explanationClicked();
})();
