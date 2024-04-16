import * as MainUI from "./mainUI";
import * as Ultimate from "./ultimate";
import * as Timer from "./timer";
import * as Score from "./score";
import * as Hp from "./hp";
import * as Explanation from "./explanation";
import * as Keyboard from "./keyboard";
import * as Preloader from "./preloader";
import * as Settings from "./settings";
import * as Theme from "./theme";
import * as Tooltip from "./tooltip";
import * as Storage from "./storage";

export function keyPressed(key: string): void {
    switch (key) {
        case "1":
            yesButtonClicked();
            break;
        case "2":
            noButtonClicked();
            break;
        case "Enter":
            if (MainUI.startButtonVisible()) {
                MainUI.startClick();
            } else if (MainUI.explanationVisible()) {
                MainUI.explanationClick();
            }
            break;
        case "r":
            Score.updateHighscore(0);
            break;
        case "Escape":
            backButtonClicked();
            break;
    }
}

export function detectedWord(word: string): void {
    switch (word) {
        case "demacia":
            Score.updateHighscore(999999999);
            break;
        case "darius":
            Score.updateHighscore(-999999999);
            break;
    }
}

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
    if (!MainUI.backButtonVisible()) {
        return;
    }
    back();
}

export function explanationClicked(): void {
    MainUI.hideExplanation();
    Score.updateHighscore();
    Score.updateScore(0);
    Timer.restoreTimer();
    newGame();
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
    let difficulty = Storage.getDifficulty() ?? 0;
    Ultimate.randomizeUltLevel();
    Hp.newHealth(difficulty);

    Timer.startTimer(() => gameOver(Ultimate.calculateUltDamage(Hp.getCurrentHp(), Hp.getMaximumHp())));
}

function gameOver(ultDamage: number): void {
    setButtons(false);
    let explanation: string = Explanation.getExplanation(Hp.getCurrentHp(), Hp.getMaximumHp(), ultDamage);
    MainUI.updateExplanation(explanation);
    MainUI.showExplanation();
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
    MainUI.hideExplanation();
    Ultimate.reset();
}

(async () => {
    await Hp.init();
    Theme.init();
    Settings.init();
    Preloader.preload();
    Keyboard.initialize();
    Tooltip.init();
})();
