import Hp from "./hp.js";

export default class Explanation {

    static explanationButtonElement = document.getElementById("explanationButton");
    static explanationTextElement = document.getElementById("explanationText");

    static showExplanation(ultDamage) {
        this.explanationTextElement.innerHTML = `Correct answer: ${(ultDamage >= Hp.currentHp) ? "Yes" : "No"} <br>
                                                Enemy current HP: ${Hp.currentHp} <br>
                                                Enemy maximum HP: ${Hp.maximumHp} <br>
                                                Ult damage: ${Math.trunc(ultDamage)} <br>
                                                Remaining HP: ${Math.trunc(Hp.currentHp - ultDamage)}`
    }

    static toggleUI() {
        if (this.explanationButtonElement.style.visibility === "") {
            this.explanationButtonElement.style.visibility = "hidden";
            this.explanationTextElement.style.visibility = "hidden";
        } else {
            this.explanationButtonElement.style.visibility = "";
            this.explanationTextElement.style.visibility = "";
        }
    }
}
