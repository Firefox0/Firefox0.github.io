import * as MainUI from "./mainUI";
import * as Ultimate from "./ultimate";
import * as Timer from "./timer";
import * as Score from "./score";
import * as Hp from "./hp";
import * as Explanation from "./explanation";
import * as Storage from "./storage";
import * as Sound from "./sound";

let highscore: number;
let currentScore: number = 0;

export function updateScore(newScore: number): void {
    currentScore = newScore;
    Score.updateScore(newScore);
}

export function updateHighscore(newHighscore?: number): void {
    if (newHighscore === undefined) {
        newHighscore = currentScore;
        if (newHighscore < highscore) {
            return;
        }
    }

    if (newHighscore === highscore) {
        return;
    }
    
    highscore = newHighscore;
    Score.updateHighscore(newHighscore);
    Storage.setHighscore(newHighscore, Storage.getDifficulty());
}

export function resetButtonClicked(): void {
    highscore = 0;
    Storage.setHighscore(highscore, Storage.getDifficulty());
    Score.updateHighscore(highscore);
}

export function keyPressed(key: string): void {
    switch (key) {
        case "1":
            MainUI.yesClick();
            break;
        case "2":
            MainUI.noClick();
            break;
        case " ":
        case "Enter":
            if (MainUI.startButtonVisible()) {
                MainUI.startClick();
            } else if (MainUI.explanationVisible()) {
                MainUI.explanationClick();
            }
            break;
        case "r":
            updateHighscore(0);
            break;
        case "Escape":
            backButtonClicked();
            break;
    }
}

export function detectedWord(word: string): void {
    switch (word) {
        case "demacia":
            updateHighscore(999999999);
            break;
        case "darius":
            updateHighscore(-999999999);
            break;
    }
}

export function yesButtonClicked(): void {
    progress(true);
}

export function noButtonClicked(): void {
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
    updateHighscore();
    updateScore(0);
    Timer.restoreTimer();
    newGame();
}

export function newGame(): void {
    Sound.stop();
    updateScore(0);
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
        Sound.correctPlay();
        Timer.decreaseDuration(0.25);
        Timer.resetTimer();
        currentScore++;
        updateScore(currentScore);
        nextRound();
    } else {
        gameOver(ultDamage);
    }
}

function nextRound(): void {
    let difficulty = Storage.getDifficulty();
    Ultimate.randomizeUltLevel();
    Hp.newHealth(difficulty);

    Timer.startTimer(() => gameOver(Ultimate.calculateUltDamage(Hp.getCurrentHp(), Hp.getMaximumHp())));
}

function gameOver(ultDamage: number): void {
    Sound.incorrectPlay();
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
    updateScore(0);
    setButtons(false);
    Hp.hideHpBar();
    MainUI.hideExplanation();
    Ultimate.reset();
}

export async function init(): Promise<void> {
    let tempHighscore = Storage.getHighscore(Storage.getDifficulty());
    updateHighscore(tempHighscore);
    await Hp.init();
}
