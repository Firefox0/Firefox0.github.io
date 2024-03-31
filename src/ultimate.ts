import * as Random from "./random";

let ultLevel: number = 0;
let circles: HTMLCollectionOf<HTMLElement> = document.getElementsByClassName("circle") as HTMLCollectionOf<HTMLElement>;
const circleSelectedColor: string = "#fcfc00";
const circleDeselectedColor: string = "black";

export function getUltLevel(): number {
    return ultLevel;
}

export function calculateUltDamage(currentHp: number, maximumHp: number): number {
    switch (ultLevel) {
        case 1:
            return 150 + 0.25 * (maximumHp - currentHp);
        case 2:
            return 300 + 0.30 * (maximumHp - currentHp);
        case 3:
            return 450 + 0.35 * (maximumHp - currentHp);
        default:
            return 0;
    }
}

export function calculateMaximumHp(currentHp: number, finalHp: number): number {
    switch (ultLevel) {
        case 1:
            return (currentHp - finalHp - 150) / 0.25 + currentHp;
        case 2:
            return (currentHp - finalHp - 300) / 0.3 + currentHp;
        case 3:
            return (currentHp - finalHp - 450) / 0.35 + currentHp;
        default:
            return 0;
    }
}

function updateUltLevel(newUltLevel: number): void {
    ultLevel = newUltLevel;
    resetCircles();
    selectCircles();
}

function resetCircles() {
    for (let i = 0; i < circles.length; i++) {
        circles[i].style.backgroundColor = circleDeselectedColor;
    }
}

function selectCircles() {
    for (let i = 0; i < ultLevel; i++) {
        circles[i].style.backgroundColor = circleSelectedColor;
    }
}

export function randomizeUltLevel(): void {
    let newUltLevel = Random.getRandomInt(1, 3);
    if (newUltLevel === ultLevel) {
        randomizeUltLevel();
        return;
    }
    updateUltLevel(newUltLevel);
}

export function reset(): void {
    updateUltLevel(0);
}
