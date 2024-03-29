import * as Storage from "./storage";

let body: HTMLElement = document.getElementsByTagName("body")[0];
let cardBodies: HTMLCollectionOf<HTMLElement> = document.getElementsByClassName("card-body") as HTMLCollectionOf<HTMLElement>;
let startButton: HTMLElement = document.getElementById("startButton")!;
let currentThemeID;

export function initialize() {
    loadTheme();
    changeTheme(currentThemeID);
    return currentThemeID;
}

export function changeTheme(themeID: number): void {
    switch (themeID) {
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
    currentThemeID = themeID;
    saveTheme();
}

function changeCardBodyColor(color: string): void {
    for (let i = 0; i < cardBodies.length; i++) {
        cardBodies[i].style.backgroundColor = color;
    }
}

function loadTheme(): void {
    let temp = Number(Storage.getTheme());
    if (!temp) {
        currentThemeID = 0;
        return;
    }
    currentThemeID = temp;
}

function saveTheme(): void {
    Storage.setTheme(currentThemeID);
}
