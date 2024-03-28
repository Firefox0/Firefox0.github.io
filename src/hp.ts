import * as Random from "./random";
import * as Ultimate from "./ultimate";

let currentHp: number = 0;
let maximumHp: number = 0;
let width: number = 750;
let height: number = 150;
let canvas: any = document.getElementById("hpBar")!;
let context: any = canvas.getContext("2d");

enum Direction {
    Up,
    Right,
    Down,
    Left
}

export function getCurrentHp() {
    return currentHp;
}

export function getMaximumHp() {
    return maximumHp;
}

function drawHpBar(): void {
    context.rect(0, 0, width, height);
}
    
function updateHpBar(): void {
    if (currentHp > maximumHp) {
        return;
    }
    
    let visibleLineAmount: number = Math.trunc(currentHp / 100);
    let totalLineAmount: number = Math.trunc(maximumHp / 100);
    let step: number = canvas.width / totalLineAmount;

    drawHpColors(visibleLineAmount, totalLineAmount, step);
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

function drawHpColors(visibleLineAmount: number, totalLineAmount: number, step: number): void {
    drawRectGradient(0, 1, visibleLineAmount * step, canvas.height, ["#bf616a", "#dd4f52", "#870a0e"], Direction.Down);
    drawRectFill(visibleLineAmount * step, 1, (totalLineAmount - visibleLineAmount) * step, height, "black");
}

function drawHpLines(visibleLineAmount: number, step: number): void {
    context.beginPath();
    for (let i = 1; i <= visibleLineAmount; i++) {
        let currentStep = i * step;
        context.moveTo(currentStep, 2);
        if (i % 10 === 0) {
            context.lineTo(currentStep, canvas.height);
        } else {
            context.lineTo(currentStep, canvas.height / 2);
        }
    }
    context.closePath();
    context.stroke();
}

function generateHealth(difficulty: number): void {
    let tempCurrentHp = 0;
    difficulty++;
    difficulty *= 2;
    let finalHp = Random.getRandomInt(Math.floor(1000 / difficulty), Math.floor(2000 / difficulty));
    if (Random.coinflip()) {
        finalHp *= -1;
    }

    switch(Ultimate.getUltLevel()) {
        case 1:
            tempCurrentHp = Random.getRandomInt(500, 2000);
            break;
        case 2:
            tempCurrentHp = Random.getRandomInt(1000, 2500);
            break;
        case 3:
            tempCurrentHp = Random.getRandomInt(1500, 3000);
            break;
    }

    currentHp = tempCurrentHp;
    maximumHp = Ultimate.calculateMaximumHp(currentHp, finalHp);
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

(() => {
    canvas.width = width;
    canvas.height = height;
    drawHpBar();
})();
