const explanationButtonElement: HTMLElement = document.getElementById("explanationButton")!;
const explanationTextElement: HTMLElement = document.getElementById("explanationText")!;
const explanationRow: HTMLElement = document.getElementById("explanationRow")!;

export function showExplanation(currentHp: number, maximumHp: number, ultDamage: number): void {
    explanationTextElement.innerHTML = `Correct answer: ${(ultDamage >= currentHp) ? "Yes" : "No"} <br>
                                        Enemy current HP: ${currentHp} <br>
                                        Enemy maximum HP: ${Math.trunc(maximumHp)} <br>
                                        Ult damage: ${Math.trunc(ultDamage)} <br>
                                        Remaining HP: ${Math.trunc(currentHp - ultDamage)}`
}

export function showUI(): void {
    explanationRow.classList.remove("d-none");
}

export function hideUI(): void {
    explanationRow.classList.add("d-none");
}

export function click(): void {
    explanationButtonElement.click();
}

export function getButton(): HTMLElement {
    return explanationButtonElement;
}
