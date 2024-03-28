let title: HTMLElement = document.getElementById("title")!;

function difficultyToText(difficulty: number): string {
    switch (difficulty) {
        case 0:
            return "QMaxGaren";
        case 1:
            return "Medium";
        case 2:
            return "Riste";
        case 3:
            return "Erislash";
        default:
            return "";
    }
}

export function refreshTitle(difficulty: number): void {
    console.log("inside refresh with title element:", title);
    console.log("difficulty is:", difficulty);
    title.innerText = `Garen Ult Trainer (${difficultyToText(difficulty)})`;
    console.log("done?");
}
