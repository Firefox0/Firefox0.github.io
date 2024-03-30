import * as Ultimate from "./ultimate";
import * as Timer from "./timer";
import * as Score from "./score";
import * as Hp from "./hp";
import * as Explanation from "./explanation";
import * as Settings from "./settings";
import * as Difficulty from "./difficulty";
import * as Help from "./help";

const yesButton: HTMLElement= document.getElementById("yes")!;
const noButton: HTMLElement = document.getElementById("no")!;
const startButton: HTMLElement = document.getElementById("startButton")!;
const backButton: HTMLElement = document.getElementById("backButton")!;
const footer: HTMLElement = document.getElementById("footer")!;

export function yesClick(): void {
    yesButton.click();
}

export function noClick(): void {
    noButton.click();
}

export function startClick(): void {
    startButton.click();
}

export function newGame(): void {
    Score.updateScore(0);
    setButtons(true);
    Timer.restoreTimer();
    nextRound();
}

export function startButtonVisible(): boolean {
    return !startButton.classList.contains("d-none");
}

function progress(answer: boolean): void {
    Timer.stopTimer();
    
    let currentHp: number = Hp.getCurrentHp();
    let maximumHp: number = Hp.getMaximumHp();
    let ultDamage: number = Ultimate.calculateUltDamage(currentHp, maximumHp);
    if ((ultDamage >= currentHp) === answer) {
        Timer.decreaseDuration(0.25);
        Timer.resetTimer();
        Score.incrementScore();
        nextRound();
    } else {
        gameOver(ultDamage);
    }
}

function nextRound(): void {
    let difficulty = Difficulty.getDifficulty();
    Ultimate.randomizeUltLevel();
    Hp.newHealth(difficulty);

    Timer.startTimer(() => gameOver(Ultimate.calculateUltDamage(Hp.getCurrentHp(), Hp.getMaximumHp())));
}

function gameOver(ultDamage: number): void {
    setButtons(false);
    Explanation.showExplanation(Hp.getCurrentHp(), Hp.getMaximumHp(), ultDamage);
    Explanation.showUI();
}

function initializeButtons(): void {
    yesButton.setAttribute("disabled", "");
    noButton.setAttribute("disabled", "");

    yesButton.onclick = () => {
        if (yesButton.hasAttribute("disabled")) {
            return;
        }
        progress(true);
    }
        
    noButton.onclick = () => {
        if (noButton.hasAttribute("disabled")) {
            return;
        }
        progress(false);
    }

    startButton.onclick = () => {
        Help.hide();
        Settings.hideButton();
        footer.classList.add("d-none");
        startButton.classList.add("d-none");
        Hp.showHpBar();
        backButton.classList.remove("d-none");
        newGame();
    };

    backButton.onclick = () => {
        back();
    }

    let explanationButton: HTMLElement = Explanation.getButton();
    explanationButton.onclick = () => {
        Explanation.hideUI();
        Score.updateHighscore();
        Timer.restoreTimer();
        newGame();
    }
}

function setButtons(bool: boolean): void {
    if (bool) {
        yesButton.removeAttribute("disabled");
        noButton.removeAttribute("disabled");
    } else {
        yesButton.setAttribute("disabled", "");
        noButton.setAttribute("disabled", "");
    }
}

function back(): void {
    Help.show();
    footer.classList.remove("d-none");
    Timer.stopTimer();
    Timer.resetTimer();
    Score.updateScore(0);
    backButton.classList.add("d-none");
    startButton.classList.remove("d-none");
    Settings.showButton();
    setButtons(false);
    Hp.hideHpBar();
    Explanation.hideUI();
    Ultimate.reset();
}

(() => {
    initializeButtons();
})();
