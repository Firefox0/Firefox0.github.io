import * as Manager from "./manager";
import * as Animations from "./animations";

const highscoreElement: HTMLElement = document.getElementById("highscore")!;
const resetButton = document.getElementById("resetHighscoreButton")!;
const scoreElement: HTMLElement = document.getElementById("score")!;

let scoreAnimation: Animation;
let highscoreAnimation: Animation;

export function updateScore(newScore: number): void {
    scoreElement.innerText = String(newScore);
    scoreAnimation.play();
}

export function updateHighscore(newHighscore: number): void {
    highscoreElement.innerText = String(newHighscore);
    highscoreAnimation.play();
    if (newHighscore === 0) {
        disableButton()
    } else {
        enableButton();
    }
}

function enableButton(): void {
    resetButton.removeAttribute("disabled");
}

function disableButton(): void {
    resetButton.setAttribute("disabled", "");
}

export function init(): void {
    document.getElementById("resetHighscoreButton")!.onclick = Manager.resetButtonClicked;
    scoreAnimation = Animations.upAndDown(scoreElement);
    highscoreAnimation = Animations.upAndDown(highscoreElement);
}
