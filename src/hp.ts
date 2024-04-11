import * as Random from "./random";
import * as Ultimate from "./ultimate";

let currentHp: number = 0;
let maximumHp: number = 0;
const canvas: any = document.getElementById("hpBar")!;
const context: any = canvas.getContext("2d");
const thickLineWidth: number = 4;
const thinLineWidth: number = 2;

enum Direction {
    Up,
    Right,
    Down,
    Left
}

export function getCurrentHp(): number {
    return currentHp;
}

export function getMaximumHp(): number {
    return maximumHp;
}

export function newHealth(difficulty: number): void {
    generateHealth(difficulty);
    updateHpBar();
}

export function showHpBar(): void {
    canvas.classList.remove("d-none");
}

export function hideHpBar(): void {
    canvas.classList.add("d-none");
}

export function getBar(): HTMLElement {
    return canvas;
}

function drawHpBar(): void {
    context.rect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
}
    
function updateHpBar(): void {
    if (currentHp > maximumHp) {
        return;
    }
    
    const dividedHp: number = currentHp / 100;
    const visibleLineAmount: number = Math.trunc(dividedHp);
    const totalLineAmount: number = Math.trunc(maximumHp / 100);
    
    const step: number = Math.trunc(canvas.offsetWidth / totalLineAmount);

    const restPercentage: number = dividedHp % 1;
    const visibleWidth: number = (visibleLineAmount + restPercentage) * step;
    const invisibleWidth: number = canvas.offsetWidth - visibleWidth;

    drawHpColors(visibleWidth, invisibleWidth);
    drawHpLines(visibleLineAmount, step);
}

function drawRectGradient(x: number, y: number, width: number, height: number, 
                          colors: string[], direction: Direction): void {
    let gradient: any = null;

    switch (direction) {
        case Direction.Up:
            gradient = context.createLinearGradient(0, height, 0, 0);
            break;
        case Direction.Right:
            gradient = context.createLinearGradient(0, 0, height, 0);
            break;
        case Direction.Down:
            gradient = context.createLinearGradient(0, 0, 0, height);
            break;
        case Direction.Left:
            gradient = context.createLinearGradient(height, 0, 0, 0);
            break;
        default:
            gradient = context.createLinearGradient(0, 0, 0, 0);
            break;
    }

    for (let i = 0; i < colors.length; i++) {
        gradient.addColorStop(i / (colors.length - 1), colors[i]);
    }

    drawRectFill(x, y, width, height, gradient);
}

function drawRectFill(x: number, y: number, width: number, height: number, color: string): void {
    context.fillStyle = color;
    context.fillRect(x, y, width, height);
}

function drawHpColors(visibleWidth: number, invisibleWidth: number): void {    
    drawRectGradient(0, 0, visibleWidth, canvas.offsetHeight, ["#f48d84", "#c64135", "#8e0b00"], Direction.Down);
    drawRectFill(visibleWidth, 0, invisibleWidth, canvas.offsetHeight, "black");
}

function drawHpLines(visibleLineAmount: number, step: number): void {
    context.beginPath();
    for (let i = 1; i <= visibleLineAmount; i++) {
        let currentStep: number = i * step;
        context.moveTo(currentStep, 1);
        if (i % 10 === 0) {
            drawRectFill(currentStep - thickLineWidth / 2, 0, thickLineWidth, canvas.offsetHeight, "black");
        } else {
            drawRectFill(currentStep - thinLineWidth / 2, 0, thinLineWidth, canvas.offsetHeight / 2, "black");
        }
    }
    context.closePath();
    context.stroke();
}

function generateHealth(difficulty: number): void {    
    let low: number;
    let max: number;
    switch (difficulty) {
        case 0:
            low = 200;
            max = 250;
            break;
        case 1:
            low = 150;
            max = 200;
            break;
        case 2:
            low = 100;
            max = 150;
            break;
        case 3:
            low = 50;
            max = 100;
            break;
        case 4:
            low = 25;
            max = 50;
            break;
        default:
            return;
    }

    let finalHp: number = Random.getRandomInt(low, max);
    if (Random.coinflip()) {
        finalHp *= -1;
    }

    switch(Ultimate.getUltLevel()) {
        case 1:
            maximumHp = Random.getRandomInt(1250, 2250);
            break;
        case 2:
            maximumHp = Random.getRandomInt(2250, 3250);
            break;
        case 3:
            maximumHp = Random.getRandomInt(3250, 6000);
            break;
    }

    currentHp = Ultimate.calculateCurrentHp(maximumHp, finalHp);
}

(() => {
    let computedStyle = getComputedStyle(canvas);
    
    let borderX = parseFloat(computedStyle.borderLeftWidth) + parseFloat(computedStyle.borderRightWidth);
    let borderY = parseFloat(computedStyle.borderTopWidth) + parseFloat(computedStyle.borderBottomWidth);    

    canvas.width = canvas.offsetWidth - borderX;
    canvas.height = canvas.offsetHeight - borderY;

    drawHpBar();
    hideHpBar();
})();
