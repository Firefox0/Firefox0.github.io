import * as Random from "./random";
import * as Animations from "./animations";

let ultLevelElement: HTMLElement = document.getElementById("ultLevel")!;
let ultLevel: number = 0;
let ultLevelAnimation: any = null;

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
            return (currentHp - finalHp - 450) / 3.5 + currentHp;
        default:
            return 0;
    }
}

function updateUltLevel(newUltLevel: number): void {
    ultLevel = newUltLevel;
    ultLevelElement.innerText = String(newUltLevel);
    ultLevelAnimation.play();
}

export function randomizeUltLevel(): void {
    let newUltLevel = Random.getRandomInt(1, 3);
    if (newUltLevel === ultLevel) {
        randomizeUltLevel();
        return;
    }
    updateUltLevel(newUltLevel);
}

(() => {
    ultLevelAnimation = Animations.upAndDown(ultLevelElement);
})();
