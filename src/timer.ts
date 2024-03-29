const timerBar: HTMLElement = document.getElementById("timerBar")!;
let intervalId: any = null;
let barWidth: number = 100;
let offset: number = 1;

export function startTimer(callback: Function): void {
    intervalId = setInterval(() => updateTimerBar(callback), 1000 / 60);
}

export function stopTimer(): void {
    resetInterval();
}

export function resetTimer(): void {
    offset = 1;
    barWidth = 100;
    timerBar.style.width = "100%";
}

export function increaseOffset(offset: number): void {
    offset += offset;
}

function resetInterval(): void {
    if (intervalId === null) {
        return;
    }
    clearInterval(intervalId);
    intervalId = null;
}

function updateTimerBar(callback: Function): void {
    barWidth -= offset;
    timerBar.style.width = barWidth + "%";

    if (barWidth <= 0) {
        stopTimer();
        callback();
    }
}

(() => {
    timerBar.style.transition = "none";
})();
