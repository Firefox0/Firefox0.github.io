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
        let ultDamage = Ultimate.calculateUltDamage(Hp.currentHp, Hp.maximumHp);
        Timer.stopTimer();
        Timer.increaseOffset(0.25);
        if ((ultDamage >= Hp.currentHp) === answer) {
            Score.updateScore(Score.currentScore + 1)
            this.newGame();
        } else {
            this.gameOver(ultDamage);
        }
    }

    static newGame() {
        Title.refreshTitle(Settings.getDifficulty());
        Ultimate.randomizeUltLevel();
        Hp.newHealth(Settings.getDifficulty());

        Timer.resetTimer();
        Timer.startTimer(() => this.gameOver(Ultimate.calculateUltDamage(Hp.currentHp, Hp.maximumHp)));
    }

    static gameOver(ultDamage) {
        Explanation.showExplanation(ultDamage);
        Explanation.toggleUI();
        Execution.toggleUI();
    }

    static initializeButtons(callback) {
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

    static toggleUI() {
        this.yesButton.toggleAttribute("disabled");
        this.noButton.toggleAttribute("disabled");
    }
}
