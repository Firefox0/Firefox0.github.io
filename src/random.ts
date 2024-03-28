export function getRandomInt(min, max) {
    return Math.floor(min + Math.random() * (max - min));
}

export function coinflip() {
    return Math.floor(Math.random() * 2) === 0;
}
