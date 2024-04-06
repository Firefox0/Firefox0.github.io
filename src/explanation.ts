export function getExplanation(currentHp: number, maximumHp: number, ultDamage: number): string {
    return `Correct answer: ${(ultDamage >= currentHp) ? "Yes" : "No"} <br>
            Enemy current HP: ${currentHp} <br>
            Enemy maximum HP: ${Math.trunc(maximumHp)} <br>
            Ult damage: ${Math.trunc(ultDamage)} <br>
            Remaining HP: ${Math.trunc(currentHp - ultDamage)}`
}
