import * as Ultimate from "./ultimate";
import * as Timer from "./timer";
import * as Score from "./score";
import * as Hp from "./hp";
import * as Explanation from "./explanation";
import * as Difficulty from "./difficulty";
import * as MainUI from "./mainUI";
import * as Keyboard from "./keyboard";

export function yesButtonClicked(): void {
    if (MainUI.isYesDisabled()) {
        return;
    }
    progress(true);
}

export function noButtonClicked(): void {
    if (MainUI.isNoDisabled()) {
        return;
    }
    progress(false);
}

export function startButtonClicked(): void {
    MainUI.showGamePage();
    Hp.showHpBar();
    newGame();
}

export function backButtonClicked(): void {
    back();
}

export function newGame(): void {
    Score.updateScore(0);
    setButtons(true);
    Timer.restoreTimer();
    nextRound();
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
    let explanationButton: HTMLElement = Explanation.getButton();
    explanationButton.onclick = () => {
        Explanation.hideUI();
        Score.updateHighscore();
        Score.updateScore(0);
        Timer.restoreTimer();
        newGame();
    }
}

function setButtons(bool: boolean): void {
    if (bool) {
        MainUI.enableDecisionButtons();
    } else {
        MainUI.disableDecisionButtons();
    }
}

function back(): void {
    MainUI.showMainPage();
    Timer.stopTimer();
    Timer.resetTimer();
    Score.updateScore(0);
    setButtons(false);
    Hp.hideHpBar();
    Explanation.hideUI();
    Ultimate.reset();
}

(() => {
    initializeButtons();
    Keyboard.initialize();
})();
