import { IEvent } from "./IEvent"
import { IUser } from "./IUser"

export type IGame = {
    _id: string,
    event: IEvent,
    user: IUser,
    points: number[],
    lastSubmition: Date,
    nbSubmitions: number
}