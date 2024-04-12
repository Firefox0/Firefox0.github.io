export function getExplanation(currentHp: number, maximumHp: number, ultDamage: number): string {
    return `CORRECT ANSWER: <span>${(ultDamage >= currentHp) ? "👍" : "👎"}</span><br>
            MAXIMUM HP: <span>${Math.trunc(maximumHp)}</span><br>
            CURRENT HP: <span>${currentHp}</span><br>
            ULT DAMAGE: <span>${Math.trunc(ultDamage)}</span><br>
            REMAINING HP: <span>${Math.trunc(currentHp - ultDamage)}</span>`
}
