import Execution from "./execution.js";
import Score from "./score.js";

export default class Keyboard {
    static {
        Keyboard.addListeners({
            "1": () => {
                Execution.yesButton.click();
                console.log("1");
            },
            "2": () => Execution.noButton.click(),
            "Enter": () => {
                Hp.startButton.click();
                Explanation.explanationButtonElement.click();
            },
            "r": () => {Score.updateHighscore(0);}
        });
        Keyboard.detectWord("demacia", () => Score.newHighScore(Number.MAX_VALUE));
    }

    static addListeners(dict) {
        document.onkeydown = (e) => {
            for (let key in dict) {
                if (e.key === key) {
                    dict[key]();
                }
            }
        } 
    }

    static detectWord(word, callback) {
        let buffer = "";
        document.onkeyup = (e) => {
            buffer += e.key;
            if (buffer.length > word.length) {
                buffer = buffer.substring(buffer.length - word.length);
            }
            if (buffer === word) {
                callback();
                this.detectWord(word, callback);
            }
        }
    }
}
