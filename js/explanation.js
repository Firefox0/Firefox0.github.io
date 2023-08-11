import Execution from "./execution.js";
import Hp from "./hp.js";
import Score from "./score.js";

export default class Explanation {

    static explanationButtonElement = document.getElementById("explanationButton");
    static explanationTextElement = document.getElementById("explanationText");
    static isVisible = null;

    static {
        this.isVisible = this.explanationButtonElement.style.visibility === "";
        this.initializeButton();
    }

    static isVisible() {
        return this.isVisible;
    }

    static showExplanation(ultDamage) {
        this.explanationTextElement.innerHTML = `Correct answer: ${(ultDamage >= Hp.currentHp) ? "Yes" : "No"} <br>
                                                Enemy current HP: ${Hp.currentHp} <br>
                                                Enemy maximum HP: ${Math.trunc(Hp.maximumHp)} <br>
                                                Ult damage: ${Math.trunc(ultDamage)} <br>
                                                Remaining HP: ${Math.trunc(Hp.currentHp - ultDamage)}`
    }

    static toggleUI() {
        if (this.isVisible) {
            this.explanationButtonElement.style.visibility = "hidden";
            this.explanationTextElement.style.visibility = "hidden";
        } else {
            this.explanationButtonElement.style.visibility = "";
            this.explanationTextElement.style.visibility = "";
        }
        this.isVisible = !this.isVisible;
    }

    static initializeButton() {
        this.explanationButtonElement.onclick = () => {
            if (!this.isVisible) {
                return;
            }
            this.toggleUI();
            Score.updateHighscore();
            Execution.newGame();
        }
    }
}
