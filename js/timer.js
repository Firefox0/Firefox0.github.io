export default class Timer {

    static timerBar = document.getElementById("timerBar");
    static intervalId = null;
    static barWidth = 100;
    static offset = 1;

    static {
        timerBar.style.transition = "none";
    }

    static startTimer(callback) {
        this.intervalId = setInterval(() => this.updateTimerBar(callback), 1000 / 60);
    }

    static stopTimer() {
        this.resetCounter = 0;
        this.resetInterval();
    }

    static resetTimer() {
        this.offset = 1;
        this.barWidth = 100;
        this.timerBar.style.width = "100%";
    }

    static increaseOffset(offset) {
        this.offset += offset;
    }

    static resetInterval() {
        if (this.intervalId === null) {
            return;
        }
        clearInterval(this.intervalId);
        this.intervalId = null;
    }

    static updateTimerBar(callback) {
        this.barWidth -= this.offset;
        this.timerBar.style.width = this.barWidth + "%";

        if (this.barWidth <= 0) {
            this.stopTimer();
            callback();
        }
    }
}
