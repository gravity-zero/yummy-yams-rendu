
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