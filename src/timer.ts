const timerBar: HTMLElement = document.getElementById("timerBar")!;
let barWidth: number = 100;
let start: DOMHighResTimeStamp | undefined = undefined;
let stop: boolean = false;
const maxDuration: number = 5;
const minDuration: number = 1;
let duration: number = maxDuration;
let requestID: number | null = null;

export function startTimer(callback: Function): void {
    stop = false;
    requestAnimationFrame((e) => updateTimerBar(e, callback));
}

export function stopTimer(): void {
    if (requestID !== null) {
        cancelAnimationFrame(requestID);
    }
    stop = true;
}

export function resetTimer(): void {
    barWidth = 100;
    timerBar.style.width = "100%";
}

export function restoreTimer(): void {
    start = undefined;
    duration = maxDuration;
    resetTimer();
}

export function decreaseDuration(value: number): void {
    duration -= value;
    if (duration < minDuration) {
        duration = minDuration;
    }
}

function updateTimerBar(step: DOMHighResTimeStamp, callback: Function): void {
    if (start === undefined) {
        start = step;
    }

    barWidth -= (step - start) / (10 * duration);
    timerBar.style.width = barWidth + "%";
    start = step;

    if (stop) {
        return;
    }
  
    if (barWidth <= 0) {
        timerBar.style.width = "0%";
        callback();
        return;
    }

    requestID = requestAnimationFrame((e) => updateTimerBar(e, callback));
}

(() => {
    timerBar.style.transition = "none";
})();
