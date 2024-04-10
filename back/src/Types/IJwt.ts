import type { User } from './IUser'
import type { Event } from './IEvent'

export type JwtPayload = () => {
    iat: Date,
    user: User,
    event: Event | null
}