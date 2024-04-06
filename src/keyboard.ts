import * as MainUI from "./mainUI";
import * as Score from "./score";

export function initialize(): void {
    addListeners({
        "1": () => {
            MainUI.yesClick();
        },
        "2": () => MainUI.noClick(),
        "Enter": () => {
            if (MainUI.startButtonVisible()) {
                MainUI.startClick();
            } else if (MainUI.explanationVisible()) {
                MainUI.explanationClick();
            }
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

