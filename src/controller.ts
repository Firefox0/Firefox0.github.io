import * as Ultimate from "./ultimate";
import * as Timer from "./timer";
import * as Score from "./score";
import * as Hp from "./hp";
import * as Explanation from "./explanation";
import * as Settings from "./settings";
import * as Difficulty from "./difficulty";

let yesButton: HTMLElement= document.getElementById("yes")!;
let noButton: HTMLElement = document.getElementById("no")!;
let startButton: HTMLElement = document.getElementById("startButton")!;
let backButton: HTMLElement = document.getElementById("backButton")!;
let footer: HTMLElement = document.getElementById("footer")!;

export function yesClick() {
    yesButton.click();
}

export function noClick() {
    noButton.click();
}

export function startClick() {
    startButton.click();
}

function progress(answer) {
    Timer.stopTimer();
    Timer.increaseOffset(0.25);
    
    let currentHp: number = Hp.getCurrentHp();
    let maximumHp: number = Hp.getMaximumHp();
    let ultDamage: number = Ultimate.calculateUltDamage(currentHp, maximumHp);
    if ((ultDamage >= currentHp) === answer) {
        Score.incrementScore();
        nextRound();
    } else {
        gameOver(ultDamage);
    }
}

function nextRound() {
    let difficulty = Difficulty.getDifficulty();
    Ultimate.randomizeUltLevel();
    Hp.newHealth(difficulty);

    Timer.resetTimer();
    Timer.startTimer(() => gameOver(Ultimate.calculateUltDamage(Hp.getCurrentHp(), Hp.getMaximumHp())));
}

export function newGame() {
    Score.updateScore(0);
    setButtons(true);
    nextRound();
}

function gameOver(ultDamage) {
    setButtons(false);
    Explanation.showExplanation(Hp.getCurrentHp(), Hp.getMaximumHp(), ultDamage);
    Explanation.showUI();
}

function initializeButtons() {
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
        Settings.hideButton();
        footer.classList.add("d-none");
        startButton.classList.add("d-none");
        Hp.showHpBar();
        backButton.classList.remove("invisible");
        newGame();
    };

    backButton.onclick = () => {
        footer.classList.remove("d-none");
        back();
    }

    let explanationButton: HTMLElement = Explanation.getButton();
    explanationButton.onclick = () => {
        Explanation.hideUI();
        Score.updateHighscore();
        newGame();
    }
}

function setButtons(bool) {
    if (bool) {
        yesButton.removeAttribute("disabled");
        noButton.removeAttribute("disabled");
    } else {
        yesButton.setAttribute("disabled", "");
        noButton.setAttribute("disabled", "");
    }
}

function back() {
    Timer.stopTimer();
    Timer.resetTimer();
    Score.updateScore(0);
    backButton.classList.add("invisible");
    startButton.classList.remove("d-none");
    Settings.showButton();
    setButtons(false);
    Hp.hideHpBar();
    Explanation.hideUI();
}

(() => {
    backButton.classList.add("invisible");
    initializeButtons();
})();
