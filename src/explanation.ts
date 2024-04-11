export function getExplanation(currentHp: number, maximumHp: number, ultDamage: number): string {
    return `Correct Answer: ${(ultDamage >= currentHp) ? "👍" : "👎"} <br>
            Maximum HP: ${Math.trunc(maximumHp)} <br>
            Current HP: ${currentHp} <br>
            Ult Damage: ${Math.trunc(ultDamage)} <br>
            Remaining HP: ${Math.trunc(currentHp - ultDamage)}`
}
