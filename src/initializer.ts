import * as Controller from "./controller";
import * as SettingsPresenter from "./settingsPresenter";
import * as Keyboard from "./keyboard";
import * as Preloader from "./preloader";
import * as Tooltip from "./tooltip";

(async () => {
    Preloader.preload();

    await Controller.init();
    SettingsPresenter.init();
    
    Keyboard.initialize();
    Tooltip.init();
})();
