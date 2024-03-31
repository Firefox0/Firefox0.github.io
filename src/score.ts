import * as Animations from "./animations";
import * as Storage from "./storage";
import * as Difficulty from "./difficulty";

const highscoreElement: HTMLElement = document.getElementById("highscore")!;
const resetButton = document.getElementById("resetHighscoreButton")!;
const scoreElement: HTMLElement = document.getElementById("score")!;
let highscore: number = 0;
let currentScore: number = 0;
let scoreAnimation: any = null;
let highscoreAnimation: any = null;

export function incrementScore(): void {
    updateScore(currentScore + 1);
}

export function loadHighscore(): void {
    let highscore = Storage.getHighscore(Difficulty.getDifficulty());
    if (highscore === null) {
        highscore = 0;
    }

    updateHighscore(highscore);
}

export function updateScore(newScore: number): void {
    currentScore = newScore;
    scoreElement.innerText = String(newScore);
    scoreAnimation.play();
}

export function updateHighscore(newHighscore?: number): void {
    if (newHighscore === undefined) {
        newHighscore = currentScore;
        if (newHighscore < highscore) {
            return;
        }
    }
    
    highscore = newHighscore;
    highscoreElement.innerText = String(newHighscore);
    highscoreAnimation.play();
    if (highscore > 0) {
        enableButton();
    } else {
        disableButton();
    }
    
    Storage.setHighscore(newHighscore, Difficulty.getDifficulty());
}

function resetHighscore(): void {
    if (highscore === 0) {
        return;
    }

    updateHighscore(0);
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
