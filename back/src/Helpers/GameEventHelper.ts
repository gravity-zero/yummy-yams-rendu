
export const checkNecessaryInformations = (data: any): boolean => {
    if(
    !data.event.name ||
    !data.event.isActive ||
    !data.lastSubmition ||
    !data.played
    ) return false;
    return true;
}