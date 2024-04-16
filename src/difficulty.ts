const title: HTMLElement = document.getElementById("title")!;

function difficultyToText(difficulty: number): string {
    switch (difficulty) {
        case 0:
            return "Easy😃";
        case 1:
            return "Medium😌";
        case 2:
            return "Hard😐";
        case 3:
            return "Extreme😡";
        case 4:
            return "Insane😈";
        default:
            return "";
    }
}

export function refreshTitle(difficulty: number): void {
    title.innerText = `Garen Ult Trainer (${difficultyToText(difficulty)})`;
}
