type Combination = "YAM'S" | "CARRÉ" | "DOUBLE" | "AUCUNE";

const RollDice = ():number => {
    return Math.floor(Math.random() * 6) + 1;
}

export const RollDices = (nbDice: number): Array<number> => {
    const sum: Array<number> = []
    for(let i=0; i < nbDice; i++)
    {
        sum.push(RollDice());
    }
    return sum;
}

export const checkCombination = (dice: number[]): Combination => {
    const counts: Record<number, number> = {};
    dice.forEach((num) => {
        counts[num] = (counts[num] || 0) + 1;
    });

    const uniqueCounts = Object.values(counts);
    const maxCount = Math.max(...uniqueCounts);

    switch (maxCount) {
        case 5:
            return "YAM'S";
        case 4:
            return "CARRÉ";
        case 3:
            return uniqueCounts.includes(2) ? "DOUBLE" : "AUCUNE";
        case 2:
            return uniqueCounts.includes(2) ? "DOUBLE" : "AUCUNE";
        default:
            return "AUCUNE";
    }
}