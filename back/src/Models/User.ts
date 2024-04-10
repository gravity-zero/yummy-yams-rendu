import { Schema, model, Document } from 'mongoose';
import type { IUser} from '../Types/IUser';

const userSchema  = new Schema<IUser>({
    "email": { type: String, index: true, unique: true, required: true },
    "pseudo": { type: String, unique: true, required: true },
    "password": { type: String },
    "created_at": { type: Date, default: Date.now }
})

const userModel = model<IUser>('User', userSchema);

export default userModel;