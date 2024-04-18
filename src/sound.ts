import * as Random from "./random";

const basePath: string = "../audio/";

const correctSounds: string[] = [
    "hit-1.mp3",
    "hit-2.mp3",
    "hit-3.mp3",
    "hit-4.mp3",
]

const falseSounds: string[] = [
    "death.mp3"
]

let audio: HTMLAudioElement = new Audio();

export function stop(): void {
    if (audio.paused) {
        return;
    }
    audio.pause();
}

export function correctPlay(): void {
    let randomIndex: number = Random.getRandomInt(0, correctSounds.length - 1);
    audio.src = basePath + "correct/" + correctSounds[randomIndex];
    audio.play();
}

export function incorrectPlay(): void {
    let randomIndex: number = Random.getRandomInt(0, falseSounds.length - 1);
    audio.src = basePath + "incorrect/" + falseSounds[randomIndex];
    audio.play();
}
