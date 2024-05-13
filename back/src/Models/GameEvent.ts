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
    nbSubmitions: { type: Number, required: true, default: 0 }
});

// Créer le modèle à partir du schéma
const gameEventModel = model<IGame>('GameEvents', gameEventSchema);

export default gameEventModel;