import * as Storage from "./storage";
import * as Hp from "./hp";

const body: HTMLElement = document.getElementsByTagName("body")[0];
const cards: HTMLCollectionOf<HTMLElement> = document.getElementsByClassName("card") as HTMLCollectionOf<HTMLElement>;
const primaryButtons: HTMLCollectionOf<HTMLElement> = document.getElementsByClassName("btn-primary") as HTMLCollectionOf<HTMLElement>;
const hpBar: HTMLElement = Hp.getBar();

const backgroundImages: string[] = [
    "../img/GarenBackground/default.png",
    "../img/GarenBackground/sanguine.png",
    "../img/GarenBackground/deserttrooper.png",
    "../img/GarenBackground/commando.png",
    "../img/GarenBackground/dreadknight.png",
    "../img/GarenBackground/rugged.png",
    "../img/GarenBackground/steellegion.png",
    "../img/GarenBackground/rogueadmiral.png",
    "../img/GarenBackground/warringkingdoms.png",
    "../img/GarenBackground/godking.png",
    "../img/GarenBackground/demaciavice.png",
    "../img/GarenBackground/mechakingdoms.png",
    "../img/GarenBackground/prestigemechakingdoms.png",
    "../img/GarenBackground/battleacademia.png",
    "../img/GarenBackground/mythmaker.png",

]

let currentTheme;

export function getBackgroundImages(): string[] {
    return backgroundImages;
}

export function getTheme(): number {
    return currentTheme;
}

export function changeTheme(theme: number): void {
    switch (theme) {
        case 0:
            newTheme("default", "#c6936f", "#314598");
            break;
        case 1:
            newTheme("sanguine", "#c33d0f", "#55452e");
            break;
        case 2:
            newTheme("deserttrooper", "#9c5d33", "#86a4ad");
            break;
        case 3:
            newTheme("commando", "#41512b", "#bea028");
            break;
        case 4:
            newTheme("dreadknight", "#708bb6", "#9a6b7e");
            break;
        case 5:
            newTheme("rugged", "#4e5862", "#836b54");
            break;
        case 6:
            newTheme("steellegion", "#373737", "#744a30");
            break;
        case 7:
            newTheme("rogueadmiral", "#503221", "#2d2231");
            break;
        case 8:
            newTheme("warringkingdoms", "#a26331", "#da4040");
            break;
        case 9:
            newTheme("godking", "#5c4744", "#8bc4d3");
            break;
        case 10:
            newTheme("demaciavice", "#10c3e5", "#e442ee");
            break;
        case 11:
            newTheme("mechakingdoms", "#685c4d", "#70b6f9");
            break;
        case 12:
            newTheme("prestigemechakingdoms", "#685449", "#f6a15f");
            break;
        case 13:
            newTheme("battleacademia", "#1c263f", "#f92136");
            break;
        case 14:
            newTheme("mythmaker", "#d45256", "#948c9b");
            break;
        default:
            return;
    }
    currentTheme = theme;
}

function newTheme(fileName: string, cardColor: string, buttonColor: string): void {
    body.style.backgroundImage = "url('../img/GarenBackground/" + fileName + ".png')";
    changeCardColors(cardColor);
    changeButtonColors(buttonColor);
    hpBar.style.outlineColor = cardColor; 
}

function changeCardColors(color: string): void {
    for (let i = 0; i < cards.length; i++) {
        cards[i].style.backgroundColor = color;
    }
}

function changeButtonColors(color: string): void {
    for (let i = 0; i < primaryButtons.length; i++) {
        let button = primaryButtons[i];
        button.style.backgroundColor = color;
        button.style.borderColor = color;
        button.addEventListener("mouseenter", () => {
            let changedColor = changeColor(color, 50);
            button.style.backgroundColor = changedColor;
            button.style.borderColor = changedColor;
        });
        button.addEventListener("mouseleave", () => {
            button.style.backgroundColor = color;
            button.style.borderColor = color;
        })
    }
}

function changeColor(color: string, offset: number): string {
    color = color.slice(1);
    let r = color.slice(0, 2);
    let g = color.slice(2, 4);
    let b = color.slice(4, 6);

    let rInt = parseInt("0x" + r);
    let gInt = parseInt("0x" + g);
    let bInt = parseInt("0x" + b);

    let rApplied = Math.round(Math.min(255, rInt + offset));
    let gApplied = Math.round(Math.min(255, gInt + offset));
    let bApplied = Math.round(Math.min(255, bInt + offset));

    return "#" + rApplied.toString(16) + gApplied.toString(16) + bApplied.toString(16);
}

export function saveTheme(): void {
    Storage.setTheme(currentTheme);
}

(() => {
    currentTheme = Storage.getTheme() ?? 0;
    changeTheme(currentTheme);
})();
