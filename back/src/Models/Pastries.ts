import { Schema, model } from 'mongoose';
import { IPastries } from '../Types/IPastries';

const pastriesSchema  = new Schema<IPastries>({
    "name": { type: String, index: true, unique: true, required: true },
    "image": { type: String, unique: true, required: true },
    "quantityWon": { type: Number, default: 0 },
    "stock": { type: Number, default: 0 }
})

const pastriesModel = model<IPastries>('Pastries', pastriesSchema);

export default pastriesModel;