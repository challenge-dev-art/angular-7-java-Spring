export interface Key
{
    id: number,
    englishName: string,
    hungarianName: string,
    place: object,
    deleted: boolean,
    quality: string,
    critic: boolean,
    responsibles: Array<any>,
    secondaryApprovers: Array<any>
}