import * as Controller from "./controller";

const words: string[] = [];
let buffer: string = "";
let maxBufferLength: number = 0;

export function initialize(): void {
    addKeyListener();
    detectWord("demacia");
    detectWord("darius");
}

function addKeyListener(): void {
    document.onkeydown = (e) => {
        Controller.keyPressed(e.key);
    } 
}

function detectWord(word: string): void {
    words.push(word);
    if (word.length > maxBufferLength) {
        maxBufferLength = word.length;
    }

    if (words.length > 1) {
        return;
    }

    document.onkeyup = (e) => {
        if (e.key.length > 1) {
            return;
        }

        buffer += e.key;
        if (buffer.length > maxBufferLength) {
            buffer = buffer.substring(1);
        }

        for (const key in words) {
            if (buffer.includes(key)) {
                buffer = "";
                Controller.detectedWord(key);
                break;
            }
        }
    }
}
