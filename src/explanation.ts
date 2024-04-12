export function getExplanation(currentHp: number, maximumHp: number, ultDamage: number): string {
    return `CORRECT ANSWER: ${(ultDamage >= currentHp) ? "👍" : "👎"} <br>
            MAXIMUM HP: ${Math.trunc(maximumHp)} <br>
            CURRENT HP: ${currentHp} <br>
            ULT DAMAGE: ${Math.trunc(ultDamage)} <br>
            REMAINING HP: ${Math.trunc(currentHp - ultDamage)}`
}
