import {getRandomInt} from "./misc.js";
import Animations from "./animations.js";

export default class Ultimate {

    static ultLevelElement = document.getElementById("ultLevel");
    static ultLevel = 0;
    static ultLevelAnimation = null;

    static {
        this.ultLevelAnimation = Animations.upAndDown(this.ultLevelElement);
    }

    static calculateUltDamage(currentHp, maximumHp) {
        switch (this.ultLevel) {
            case 1:
                return 150 + 0.25 * (maximumHp - currentHp);
            case 2:
                return 300 + 0.30 * (maximumHp - currentHp);
            case 3:
                return 450 + 0.35 * (maximumHp - currentHp);
        }
    }

    static updateUltLevel(newUltLevel) {
        this.ultLevel = newUltLevel;
        this.ultLevelElement.innerText = this.ultLevel;
        this.ultLevelAnimation.play();
    }

    static randomizeUltLevel() {
        let newUltLevel = getRandomInt(1, 3);
        this.updateUltLevel(newUltLevel);
    }
}
