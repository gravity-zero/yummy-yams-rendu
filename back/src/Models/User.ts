import { Schema, model } from 'mongoose';
import type { IUser } from '../Types/IUser';

const userSchema: Schema<IUser> = new Schema({
    "email": { type: String, index: true, unique: true, required: true },
    "pseudo": { type: String, unique: true, required: true },
    "password": { type: String },
    "created_at": { type: Date, default: Date.now }
})

const userModel = model<IUser>('Users', userSchema);

export default userModel;