import Storage from "./storage.js";

export default class Theme {

    static body = document.getElementsByTagName("body")[0];
    static cardBodies = document.getElementsByClassName("card-body");
    static startButton = document.getElementById("startButton");
    static currentThemeID;

    static initialize() {
        this.loadTheme();
        this.changeTheme(this.currentThemeID);
        return this.currentThemeID;
    }

    static changeTheme(themeID) {
        switch (themeID) {
            case 0:
                this.body.style.backgroundColor = "#434c5e";
                this.changeCardBodyColor("#4c566a");
                this.startButton.style.backgroundColor = "";
                break;
            case 1:
                this.body.style.backgroundColor = "#2e3440";
                this.changeCardBodyColor("#3b4252");
                break;
            default:
                return;
        }
        this.currentThemeID = themeID;
        this.saveTheme();
    }

    static changeCardBodyColor(color) {
        for (let i = 0; i < this.cardBodies.length; i++) {
            this.cardBodies[i].style.backgroundColor = color;
        }
    }

    static loadTheme() {
        let temp = Number(Storage.get("theme"));
        if (!temp) {
            this.currentThemeID = 0;
            return;
        }
        this.currentThemeID = temp;
    }

    static saveTheme() {
        Storage.set("theme", this.currentThemeID);
    }
}
