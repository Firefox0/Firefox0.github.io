export function getRandomInt(min: number, max: number): number {
    return Math.trunc(min + Math.random() * (max + 1 - min));
}

export function coinflip(): boolean {
    return Math.trunc(Math.random() * 2) === 0;
}
