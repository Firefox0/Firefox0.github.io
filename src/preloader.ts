import * as Theme from "./theme";

export function preload() {
    (() => {
        let backgroundImages: string[] = Theme.getBackgroundImages();
        for (let i = 0; i < backgroundImages.length; i++) {
            let img = new Image();
            img.src = backgroundImages[i];
        }
    })();
}
