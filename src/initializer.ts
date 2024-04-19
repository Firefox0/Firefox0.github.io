import * as Manager from "./manager";
import * as Keyboard from "./keyboard";
import * as Preloader from "./preloader";
import * as Tooltip from "./tooltip";
import * as Help from "./help";
import * as Sound from "./sound";
import * as Score from "./score";
import * as MainUI from "./mainUI";

(async () => {
    Preloader.preload();
    Score.init();
    Help.init();
    Sound.init();
    Keyboard.init();
    Tooltip.init();    
    await Manager.init();
    MainUI.init();
})();
