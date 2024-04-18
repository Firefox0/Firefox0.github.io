import * as Random from "./random";

const basePath: string = "../audio/";
const correctFolder: string = "correct/";
const incorrectFolder: string = "incorrect/";

const correctSounds: string[] = [
    "hit-1.mp3",
    "hit-2.mp3",
    "hit-3.mp3",
    "hit-4.mp3",
]

const incorrectSounds: string[] = [
    "death.mp3"
]

let audio: HTMLAudioElement = new Audio();

export function getSoundPaths(): string[] {
    return [...correctSounds, ...incorrectSounds];
}

export function stop(): void {
    if (audio.paused) {
        return;
    }
    audio.pause();
}

export function correctPlay(): void {
    let randomIndex: number = Random.randomIndex(correctSounds.length);
    audio.src = correctSounds[randomIndex];
    audio.play();
}

export function incorrectPlay(): void {
    let randomIndex: number = Random.randomIndex(incorrectSounds.length);
    audio.src = incorrectSounds[randomIndex];
    audio.play();
}

export function init(): void {
    for (let i = 0; i < correctSounds.length; i++) {
        correctSounds[i] = basePath + correctFolder + correctSounds[i];
    }

    for (let i = 0; i < incorrectSounds.length; i++) {
        incorrectSounds[i] = basePath + incorrectFolder + incorrectSounds[i];
    }
}
