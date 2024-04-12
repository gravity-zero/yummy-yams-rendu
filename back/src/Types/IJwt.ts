import type { IUser } from './IUser'
import type { IEvent } from './IEvent'

export type IJwt = {
    iat: number,
    exp: number,
    user: Omit<IUser, 'password'>,
    event?: IEvent | null
}