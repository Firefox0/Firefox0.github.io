import * as Storage from "./storage";

let body: HTMLElement = document.getElementsByTagName("body")[0];
let cardBodies: HTMLCollectionOf<HTMLElement> = document.getElementsByClassName("card-body") as HTMLCollectionOf<HTMLElement>;
let startButton: HTMLElement = document.getElementById("startButton")!;
let currentTheme;

export function getTheme(): number {
    return currentTheme;
}

export function changeTheme(theme: number): void {
    switch (theme) {
        case 0:
            body.style.backgroundColor = "#434c5e";
            changeCardBodyColor("#4c566a");
            startButton.style.backgroundColor = "";
            break;
        case 1:
            body.style.backgroundColor = "#2e3440";
            changeCardBodyColor("#3b4252");
            break;
        default:
            return;
    }
    currentTheme = theme;
}

function changeCardBodyColor(color: string): void {
    for (let i = 0; i < cardBodies.length; i++) {
        cardBodies[i].style.backgroundColor = color;
    }
}

export function saveTheme(): void {
    Storage.setTheme(currentTheme);
}

(() => {
    currentTheme = Storage.getTheme() ?? 0;
    changeTheme(currentTheme);
})();
