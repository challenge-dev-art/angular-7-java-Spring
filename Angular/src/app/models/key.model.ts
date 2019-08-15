export interface Key
{
    id: number,
    name: string,
    building: string,
    room: string,
    door: string,
    isSpecial: boolean,
    approver_array: Array<any>,
    upload_type: Array<any>,
    createdDate: string,
    approver: string
}