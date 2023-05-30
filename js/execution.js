export default class Execution {
    static yesButton = document.getElementById("yes");
    static noButton = document.getElementById("no");

    static initializeButtons(callback) {
        this.yesButton.onclick = () => {
            if (this.yesButton.hasAttribute("disabled")) {
                return;
            }
            callback(true);
        }
        this.noButton.onclick = () => {
            if (this.noButton.hasAttribute("disabled")) {
                return;
            }
            callback(false);
        }
    }

    static toggleUI() {
        this.yesButton.toggleAttribute("disabled");
        this.noButton.toggleAttribute("disabled");
    }
}
