import * as Hp from "./hp";
import * as Timer from "./timer";

const body: HTMLElement = document.getElementsByTagName("body")[0];
const cards: HTMLCollectionOf<HTMLElement> = document.getElementsByClassName("card") as HTMLCollectionOf<HTMLElement>;
const primaryButtons: HTMLCollectionOf<HTMLElement> = document.getElementsByClassName("btn-primary") as HTMLCollectionOf<HTMLElement>;
const ultImage: HTMLElement = document.getElementById("ultImage")!;
const timerBar: HTMLElement = Timer.getBar();
const progressBar: HTMLElement = document.getElementById("progressBar")!;

let hpBar: HTMLElement;

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

export function getBackgroundImages(): string[] {
    return backgroundImages;
}

export function changeTheme(theme: number): void {
    switch (theme) {
        case 0:
            newTheme(theme, "#c6936f", "#314598");
            break;
        case 1:
            newTheme(theme, "#c33d0f", "#3d3935");
            break;
        case 2:
            newTheme(theme, "#9c5d33", "#86a4ad");
            break;
        case 3:
            newTheme(theme, "#41512b", "#bea028");
            break;
        case 4:
            newTheme(theme, "#708bb6", "#9a6b7e");
            break;
        case 5:
            newTheme(theme, "#4e5862", "#836b54");
            break;
        case 6:
            newTheme(theme, "#373737", "#744a30");
            break;
        case 7:
            newTheme(theme, "#503221", "#2d2231");
            break;
        case 8:
            newTheme(theme, "#a26331", "#da4040");
            break;
        case 9:
            newTheme(theme, "#5c4744", "#51a7bc");
            break;
        case 10:
            newTheme(theme, "#10c3e5", "#e442ee");
            break;
        case 11:
            newTheme(theme, "#685c4d", "#5ea4e5");
            break;
        case 12:
            newTheme(theme, "#685449", "#f6a15f");
            break;
        case 13:
            newTheme(theme, "#1c263f", "#f92136");
            break;
        case 14:
            newTheme(theme, "#d45256", "#948c9b");
            break;
        default:
            return;
    }
}

function newTheme(theme: number, cardColor: string, buttonColor: string): void {
    body.style.backgroundImage = "url('" + backgroundImages[theme] + "')";
    hpBar.style.borderColor = cardColor;
    ultImage.style.outlineColor = buttonColor;
    timerBar.style.backgroundColor = buttonColor;
    progressBar.style.borderColor = cardColor;
    changeCardColors(cardColor, buttonColor);
    changeButtonColors(buttonColor, cardColor);
}

function changeCardColors(color: string, borderColor: string): void {
    for (let i = 0; i < cards.length; i++) {
        cards[i].style.backgroundColor = color;
        cards[i].style.borderColor = borderColor;
    }
}

function changeButtonColors(color: string, borderColor: string): void {
    for (let i = 0; i < primaryButtons.length; i++) {
        let button = primaryButtons[i];
        button.style.backgroundColor = color;
        button.style.borderColor = borderColor;
        button.addEventListener("mouseenter", () => {
            let changedColor = changeColor(color, 50);
            button.style.backgroundColor = changedColor;
            button.style.borderColor = borderColor;
        });
        button.addEventListener("mousedown", () => {
            let changedColor = changeColor(color, -50);
            button.style.backgroundColor = changedColor;
            button.style.borderColor = borderColor;
        });
        button.addEventListener("mouseleave", () => {
            button.style.backgroundColor = color;
            button.style.borderColor = borderColor;
        })
    }
}

function hexToInt(hex: string): number {
    return parseInt("0x" + hex);
}

function applyColorOffset(color: number, offset: number): string {
    let applied: number = Math.max(0, Math.round(Math.min(255, color + offset)));
    if (applied < 10) {
        return "0" + applied;
    }
    return applied.toString(16);
}

function changeColor(color: string, offset: number): string {
    color = color.slice(1);
    let r: string = color.slice(0, 2);
    let g: string = color.slice(2, 4);
    let b: string = color.slice(4, 6);

    let rInt: number = hexToInt(r);
    let gInt: number = hexToInt(g);
    let bInt: number = hexToInt(b);

    let rApplied: string = applyColorOffset(rInt, offset);
    let gApplied: string = applyColorOffset(gInt, offset);
    let bApplied: string = applyColorOffset(bInt, offset);

    return "#" + rApplied + gApplied + bApplied;
}

export function init(value: number): void {
    hpBar = Hp.getBar();
    changeTheme(value);
}
