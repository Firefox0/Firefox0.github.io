import * as Controller from "./controller";
import * as Score from "./score";
import * as Explanation from "./explanation";

function initialize(): void {
    addListeners({
        "1": () => {
            Controller.yesClick();
        },
        "2": () => Controller.noClick(),
        "Enter": () => {
            Controller.startClick();
            Explanation.click();
        },
        "r": () => {Score.updateHighscore(0);}
    });
    detectWord("demacia", () => Score.updateHighscore(Number.MAX_VALUE));
}

function addListeners(dict: object): void {
    document.onkeydown = (e) => {
        for (let key in dict) {
            if (e.key === key) {
                dict[key]();
            }
        }
    } 
}

function detectWord(word: string, callback: Function): void {
    let buffer = "";
    document.onkeyup = (e) => {
        buffer += e.key;
        if (buffer.length > word.length) {
            buffer = buffer.substring(buffer.length - word.length);
        }
        if (buffer === word) {
            callback();
            detectWord(word, callback);
        }
    }
}
