import * as Storage from "./storage";

const body: HTMLElement = document.getElementsByTagName("body")[0];
const cards: HTMLCollectionOf<HTMLElement> = document.getElementsByClassName("card") as HTMLCollectionOf<HTMLElement>;
const startButton: HTMLElement = document.getElementById("startButton")!;

let currentTheme;

export function getTheme(): number {
    return currentTheme;
}

export function changeTheme(theme: number): void {
    switch (theme) {
        case 0:
            body.style.backgroundColor = "#434c5e";
            changeCardColor("#4c566a");
            startButton.style.backgroundColor = "";
            break;
        case 1:
            body.style.backgroundColor = "#2e3440";
            changeCardColor("#3b4252");
            break;
        default:
            return;
    }
    currentTheme = theme;
}

function changeCardColor(color: string): void {
    for (let i = 0; i < cards.length; i++) {
        cards[i].style.backgroundColor = color;
    }
}

export function saveTheme(): void {
    Storage.setTheme(currentTheme);
}

(() => {
    currentTheme = Storage.getTheme() ?? 0;
    changeTheme(currentTheme);
})();
