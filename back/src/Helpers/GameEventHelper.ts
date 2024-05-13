import { IPastries } from "../Types/IPastries";

function shuffle<T>(array: T[]): T[] {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
}

export const getRandomPastries = (nb: number, pastries: Array<IPastries>): Array<IPastries> => {
    const assignedPastries: IPastries[] = [];
    const shuffledPastries = shuffle(pastries);
    
    shuffledPastries.forEach(pastrie => {
        if(
            pastrie.quantityWon < pastrie.stock &&
            assignedPastries.length < nb)
        {
            assignedPastries.push(pastrie)
        }
    });

    return assignedPastries;
}