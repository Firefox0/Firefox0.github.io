import * as Theme from "./theme";
import * as Sound from "./sound";

export function preload() {
    let backgroundImages: string[] = Theme.getBackgroundImages();
    backgroundImages.forEach((e) => {
        let img = new Image();
        img.src = e;
    });

    let sounds: string[] = Sound.getSoundPaths();
    sounds.forEach((e) => {
        let audio = new Audio(e);
        audio.preload = "auto";
    });
}
