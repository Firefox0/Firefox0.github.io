import Ultimate from "./ultimate.js";
import Timer from "./timer.js";
import Score from "./score.js";
import Hp from "./hp.js";
import Explanation from "./explanation.js";
import Settings from "./settings.js";
import Keyboard from "./keyboard.js";

export default class Execution {
    static yesButton = document.getElementById("yes");
    static noButton = document.getElementById("no");
    static startButton = document.getElementById("startButton");
    static startIsVisible = null;
    static backButton = document.getElementById("backButton");
    static footer = document.getElementById("footer");

    static {
        this.backButton.classList.replace("visible", "invisible");
        this.initializeButtons();
    }

    static progress(answer) {
        Timer.stopTimer();
        Timer.increaseOffset(0.25);
        let ultDamage = Ultimate.calculateUltDamage(Hp.currentHp, Hp.maximumHp);
        if ((ultDamage >= Hp.currentHp) === answer) {
            Score.updateScore(Score.currentScore + 1)
            this.nextRound();
        } else {
            this.gameOver(ultDamage);
        }
    }

    static nextRound() {
        let difficulty = Settings.getDifficulty();
        Ultimate.randomizeUltLevel();
        Hp.newHealth(difficulty);

        Timer.resetTimer();
        Timer.startTimer(() => this.gameOver(Ultimate.calculateUltDamage(Hp.currentHp, Hp.maximumHp)));
    }

    static newGame() {
        Score.updateScore(0);
        this.setButtons(true);
        this.nextRound();
    }

    static gameOver(ultDamage) {
        this.setButtons(false);
        Explanation.showExplanation(ultDamage);
        Explanation.showUI();
    }

    static initializeButtons() {
        this.yesButton.setAttribute("disabled", "");
        this.noButton.setAttribute("disabled", "");
        this.yesButton.onclick = () => {
            if (this.yesButton.hasAttribute("disabled")) {
                return;
            }
            this.progress(true);
        }
        this.noButton.onclick = () => {
            if (this.noButton.hasAttribute("disabled")) {
                return;
            }
            this.progress(false);
        }

        this.startButton.onclick = () => {
            Settings.hideButton();
            this.footer.classList.add("d-none");
            this.startButton.classList.replace("d-block", "d-none");
            Hp.showHpBar();
            this.backButton.classList.replace("invisible", "visible");
            this.newGame();
        };

        this.backButton.onclick = () => {
            this.footer.classList.remove("d-none");
            this.back();
        }
    }

    static setButtons(bool) {
        if (bool) {
            this.yesButton.removeAttribute("disabled");
            this.noButton.removeAttribute("disabled");
        } else if (!bool) {
            this.yesButton.setAttribute("disabled", "");
            this.noButton.setAttribute("disabled", "");
        } else {
            return;
        }
    }

    static back() {
        Timer.stopTimer();
        Timer.resetTimer();
        Score.updateScore(0);
        this.backButton.classList.replace("visible", "invisible");
        this.startButton.classList.replace("d-none", "d-block");
        Settings.showButton();
        this.setButtons(false);
        Hp.hideHpBar();
        Explanation.hideUI();
    }
}
