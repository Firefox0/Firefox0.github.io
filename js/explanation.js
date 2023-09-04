import Execution from "./execution.js";
import Hp from "./hp.js";
import Score from "./score.js";

export default class Explanation {

    static explanationButtonElement = document.getElementById("explanationButton");
    static explanationTextElement = document.getElementById("explanationText");
    static explanationRow = document.getElementById("explanationRow");

    static {
        this.initializeButton();
    }

    static showExplanation(ultDamage) {
        this.explanationTextElement.innerHTML = `Correct answer: ${(ultDamage >= Hp.currentHp) ? "Yes" : "No"} <br>
                                                Enemy current HP: ${Hp.currentHp} <br>
                                                Enemy maximum HP: ${Math.trunc(Hp.maximumHp)} <br>
                                                Ult damage: ${Math.trunc(ultDamage)} <br>
                                                Remaining HP: ${Math.trunc(Hp.currentHp - ultDamage)}`
    }

    static showUI() {
        this.explanationRow.classList.remove("d-none");
    }

    static hideUI() {
        this.explanationRow.classList.add("d-none");
    }

    static initializeButton() {
        this.explanationButtonElement.onclick = () => {
            this.hideUI();
            Score.updateHighscore();
            Execution.newGame();
        }
    }
}
