import Timer from "./timer.js";
import Score from "./score.js";
import Hp from "./hp.js";
import Ultimate from "./ultimate.js";
import Explanation from "./explanation.js";
import Execution from "./execution.js";

class GarenUltTrainer {

    static newGame() {
        Ultimate.randomizeUltLevel();
        Hp.newHealth(Ultimate.ultLevel);

        Timer.resetTimer();
        Timer.startTimer(() => this.gameOver(Ultimate.calculateUltDamage(Hp.currentHp, Hp.maximumHp)));
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

    static gameOver(ultDamage) {
        Explanation.showExplanation(ultDamage);
        Explanation.toggleUI();
        Execution.toggleUI();
    }

    static initializeButtons() {
        Execution.initializeButtons((b) => this.progress(b));
        Explanation.explanationButtonElement.onclick = () => {
            Explanation.toggleUI();
            Execution.toggleUI();
            if (Score.currentScore > Score.highscore) {
                Score.newHighScore(Score.currentScore);
            }
            Score.updateScore(0);
            this.newGame();
        }
        Hp.startButton.onclick = () => {
            Execution.toggleUI();
            Hp.toggleUI();
            this.newGame();
        }
    }

    static main() {
        this.initializeButtons();
        Score.loadHighscore();
    }
}

window.onload = () => {
    GarenUltTrainer.main();
}
