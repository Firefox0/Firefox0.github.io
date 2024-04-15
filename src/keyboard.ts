import * as MainUI from "./mainUI";
import * as Score from "./score";

const wordObject: object = {};
let buffer: string = "";
let longestString: number = 0;

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

    detectWord("demacia", () => Score.updateHighscore(999999999));
    detectWord("darius", () => Score.updateHighscore(-999999999));
}

function addListeners(dict: object): void {
    document.onkeydown = (e) => {
        for (const key in dict) {
            if (e.key === key) {
                dict[key]();
            }
        }
    } 
}

function detectWord(word: string, callback: Function): void {
    wordObject[word] = callback;
    if (word.length > longestString) {
        longestString = word.length;
    }

    if (Object.keys(wordObject).length > 1) {
        return;
    }

    document.onkeyup = (e) => {
        if (e.key.length > 1) {
            return;
        }

        buffer += e.key;
        if (buffer.length > longestString) {
            buffer = buffer.substring(1);
        }

        for (const key in wordObject) {
            if (buffer.includes(key)) {
                buffer = "";
                wordObject[key]();
                break;
            }
        }
    }
}
