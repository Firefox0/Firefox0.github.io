import * as Animations from "./animations";
import * as Storage from "./storage";
import * as Difficulty from "./difficulty";

let highscoreElement: HTMLElement = document.getElementById("highscore")!;
let resetButton = document.getElementById("resetHighscoreButton")!;
let highscore: number = 0;
let currentScore: number = 0;
let scoreElement: HTMLElement = document.getElementById("score")!;
let scoreAnimation: any = null;
let highscoreAnimation: any = null;

export function incrementScore(): void {
    updateScore(currentScore + 1);
}

export function loadHighscore(): void {
    let highscore = Storage.getHighscore(Difficulty.getDifficulty());
    if (highscore === null || highscore == 0) {
        highscore = 0;
    }

    updateHighscore(highscore);
}

function resetHighscore(): void {
    if (highscore === 0) {
        return;
    }

    updateHighscore(0);
}

export function updateScore(newScore: number): void {
    currentScore = newScore;
    scoreElement.innerText = String(newScore);
    scoreAnimation.play();
}

export function updateHighscore(score?: number): void {
    if (score === undefined) {
        score = currentScore;
    }

    highscore = score;
    highscoreElement.innerText = String(score);
    highscoreAnimation.play();
    if (highscore > 0) {
        enableButton();
    } else {
        disableButton();
    }
    
    Storage.setHighscore(score, Difficulty.getDifficulty());
}

function enableButton(): void {
    resetButton.removeAttribute("disabled");
}

function disableButton(): void {
    resetButton.setAttribute("disabled", "");
}

(() => {
    document.getElementById("resetHighscoreButton")!.onclick = () => resetHighscore();
    scoreAnimation = Animations.upAndDown(scoreElement);
    highscoreAnimation = Animations.upAndDown(highscoreElement);
    loadHighscore();
})();
