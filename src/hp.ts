import * as Random from "./random";
import * as Ultimate from "./ultimate";
import { Application, Graphics, FillGradient } from 'pixi.js';

let currentHp: number = 0;
let maximumHp: number = 0;
const thickLineWidth: number = 4;
const thinLineWidth: number = 2;
let app: Application = new Application();
let graphics: Graphics = new Graphics();
let canvas: any = document.getElementById("hpBar");

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
    graphics.clear();
    generateHealth(difficulty);
    updateHpBar();
    app.stage.addChild(graphics);
}

export function showHpBar(): void {
    app.canvas.classList.remove("d-none");
}

export function hideHpBar(): void {
    app.canvas.classList.add("d-none");
}

export function getBar(): HTMLElement {
    return app.canvas;
}
    
function updateHpBar(): void {
    if (currentHp > maximumHp) {
        return;
    }
    
    const visibleLineAmount: number = currentHp / 100;
    const totalLineAmount: number = maximumHp / 100;
    const step: number = canvas.width / totalLineAmount;
    const visibleWidth: number = visibleLineAmount * step;
    const invisibleWidth: number = canvas.width - visibleWidth;

    drawHpColors(visibleWidth, invisibleWidth);
    drawHpLines(visibleLineAmount, step);
}

function drawRectGradient(x: number, y: number, width: number, height: number, 
                          colors: string[], direction: Direction): void {
    const colorStops = colors;
    let gradientFill;

    switch (direction) {
        case Direction.Up:
            gradientFill = new FillGradient(0, height, 0, 0);
            break;
        case Direction.Right:
            gradientFill = new FillGradient(0, 0, height, 0);
            break;
        case Direction.Down:
            gradientFill = new FillGradient(0, 0, 0, height);
            break;
        case Direction.Left:
            gradientFill = new FillGradient(height, 0, 0, 0);
            break;
        default:
            return;
    }

    colorStops.forEach((number, index) => {
        const ratio = index / colorStops.length;

        gradientFill.addColorStop(ratio, number);
    });

    drawRectFill(x, y, width, height, gradientFill);
}

function drawRectFill(x: number, y: number, width: number, height: number, color: string): void {
    graphics
        .rect(x, y, width, height)
        .fill(color);
}

function drawHpColors(visibleWidth: number, invisibleWidth: number): void {    
    drawRectGradient(0, 0, visibleWidth, canvas.height, ["#f48d84", "#c64135", "#8e0b00"], Direction.Down);
    drawRectFill(visibleWidth, 0, invisibleWidth, canvas.height, "black");
}

function drawHpLines(visibleLineAmount: number, step: number): void {
    for (let i = 1; i <= visibleLineAmount; i++) {
        let currentStep = i * step;
        if (i % 10 === 0) {
            drawRectFill(currentStep - thickLineWidth / 2, 0, thickLineWidth, canvas.height, "black");
        } else {
            drawRectFill(currentStep - thinLineWidth / 2, 0, thinLineWidth, canvas.height / 2, "black");
        }
    }
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

export async function init(): Promise<void> {
    let computedStyle = getComputedStyle(canvas);
    let borderX = parseFloat(computedStyle.borderLeftWidth) + parseFloat(computedStyle.borderRightWidth);
    let borderY = parseFloat(computedStyle.borderTopWidth) + parseFloat(computedStyle.borderBottomWidth);    
    let desiredWidth: number = canvas.offsetWidth - borderX;
    let desiredHeight: number = canvas.offsetHeight - borderY;
    
    await app.init({width: desiredWidth, height: desiredHeight});
    
    app.canvas.classList.add("w-100", "h-100", "d-none");
    app.canvas.width = desiredWidth;
    app.canvas.height = desiredHeight;    
    app.canvas.style.width = String(desiredWidth);
    app.canvas.style.height = String(desiredHeight);

    canvas.replaceWith(app.canvas);
    canvas = app.canvas;
}
