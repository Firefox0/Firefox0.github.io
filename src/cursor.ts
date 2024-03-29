import * as Storage from "./storage";

const body: HTMLBodyElement = document.getElementsByTagName("body")[0]!;
const buttons: HTMLCollectionOf<HTMLElement> = document.getElementsByClassName("btn") as HTMLCollectionOf<HTMLElement>;
let cursor: number;

export function getCursor(): number {
    return cursor;
}

export function saveCursor(): void {
    Storage.setCursor(cursor);
}

export function updateCursor(value: number): void {
    let path: string;

    switch (value) {
        case 0:
            path = "../misc/legacy.cur";
            break;
        case 1:
            path = "../misc/modern.cur";
            break;
        default:
            path = "";
            break;
    }

    let fullString = "cursor: url('" + path + "'), auto;"
    body.style.cssText += fullString;
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].onmouseenter = () => {
            buttons[i].style.cssText += fullString;
        };
    }
}

(() => {
    cursor = Storage.getCursor() ?? 1;
    updateCursor(cursor);
})();
