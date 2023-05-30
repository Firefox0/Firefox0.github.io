export default class Random {
    static getRandomInt(min, max) {
        return Math.floor(min + Math.random() * max);
    }
}
