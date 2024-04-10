import type { User } from './User'
import type { Event } from './Event'

export type JwtPayload = () => {
    iat: Date,
    user: User,
    event: Event | null
}