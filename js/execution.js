import Ultimate from "./ultimate.js";
import Timer from "./timer.js";
import Score from "./score.js";
import Hp from "./hp.js";
import Explanation from "./explanation.js";
import Title from "./title.js";
import Settings from "./settings.js";

export default class Execution {
    static yesButton = document.getElementById("yes");
    static noButton = document.getElementById("no");

    static {
        this.initializeButtons();
    }

    static progress(answer) {
        this.setButtons(false);
        Timer.stopTimer();
        Timer.increaseOffset(0.25);
        let ultDamage = Ultimate.calculateUltDamage(Hp.currentHp, Hp.maximumHp);
        if ((ultDamage >= Hp.currentHp) === answer) {
            Score.updateScore(Score.currentScore + 1)
            this.newGame();
        } else {
            this.gameOver(ultDamage);
        }
    }

    static newGame() {
        let difficulty = Settings.getDifficulty();
        Title.refreshTitle(difficulty);
        Ultimate.randomizeUltLevel();
        Hp.newHealth(difficulty);
        
        Settings.toggleUI();
        this.setButtons(true);
        Timer.resetTimer();
        Timer.startTimer(() => this.gameOver(Ultimate.calculateUltDamage(Hp.currentHp, Hp.maximumHp)));
    }

    static gameOver(ultDamage) {
        Explanation.showExplanation(ultDamage);
        Explanation.toggleUI();
        Settings.toggleUI();
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
}
