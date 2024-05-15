import { Schema, model, Document } from 'mongoose';
import { IGame } from '../Types/IGame';

const gameEventSchema = new Schema<IGame>({
    event: {
        name: {type: String, required: true},
        date: { type: Date, default: Date.now },
    },
    user: { type: String, required: true },
    points: { type: [Number], required: true, default: [] },
    lastSubmition: { type: Date},
    nbSubmitions: { type: Number, required: true, default: 0 },
    prices: [{
        _id: { type: Schema.Types.ObjectId, ref: 'Pastries' },
        name: { type: String, required: true },
        image: { type: String, required: true },
    }]
});

const gameEventModel = model<IGame>('GameEvents', gameEventSchema);

export default gameEventModel;