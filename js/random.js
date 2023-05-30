export default class Random {
    static getRandomInt(min, max) {
        return Math.floor(min + Math.random() * (max - min));
    }

    static coinflip() {
        return Math.floor(Math.random() * 2) === 0;
    }
}
