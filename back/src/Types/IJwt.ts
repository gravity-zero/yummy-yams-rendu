import type { IUser } from './IUser'
import type { IEvent } from './IEvent'

export type IJwt = {
    iat: Number,
    //exp: Number,
    user: IUser,
    event?: IEvent | null
}