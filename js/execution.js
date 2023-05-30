export default class Execution {
    static yesButton = document.getElementById("yes");
    static noButton = document.getElementById("no");

    static initializeButtons(callback) {
        this.yesButton.onclick = () => callback(true);
        this.noButton.onclick = () => callback(false);
    }

    static toggleUI() {
        this.yesButton.disabled = !this.yesButton.disabled;
        this.noButton.disabled = !this.noButton.disabled;
    }
}
