export function getRandomInt(min: number, max: number): number {
    return Math.floor(min + Math.random() * (max - min));
}

export function coinflip(): boolean {
    return Math.floor(Math.random() * 2) === 0;
}
