import * as Manager from "./manager";
import * as SettingsManager from "./settingsManager";
import * as Keyboard from "./keyboard";
import * as Preloader from "./preloader";
import * as Tooltip from "./tooltip";

(async () => {
    Preloader.preload();

    await Manager.init();
    SettingsManager.init();
    
    Keyboard.initialize();
    Tooltip.init();
})();
