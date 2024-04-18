import * as Random from "./random";

const basePath: string = "../audio/";

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
    return [...correctSounds, ...incorrectSounds]
}

export function stop(): void {
    if (audio.paused) {
        return;
    }
    audio.pause();
}

export function correctPlay(): void {
    let randomIndex: number = Random.randomIndex(correctSounds.length);
    audio.src = basePath + "correct/" + correctSounds[randomIndex];
    audio.play();
}

export function incorrectPlay(): void {
    let randomIndex: number = Random.randomIndex(incorrectSounds.length);
    audio.src = basePath + "incorrect/" + incorrectSounds[randomIndex];
    audio.play();
}
