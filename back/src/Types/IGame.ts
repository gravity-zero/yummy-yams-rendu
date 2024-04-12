import { IEvent } from "./IEvent"
import { IUser } from "./IUser"

export type IGame = {
    event: IEvent,
    user: IUser,
    points: number,
    lastSubmition: Date,
    played: number
}