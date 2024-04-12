import { Schema, model, Document } from 'mongoose';
import { IGame } from '../Types/IGame';
import userModel from './User';

// Définir le schéma
//TODO TODO
const gameEventSchema = new Schema<IGame>({
    event: {
        name: {type: String, required: true},
        isActive : { type: Boolean, required: true, default: true},
        date: { type: Date, default: Date.now },
    },
    user: { type: String, required: true },
    points: { type: Number, required: true, default: 0 },
    lastSubmition: { type: Date},
    played: { type: Number, required: true, default: 0 }
});

// Créer le modèle à partir du schéma
const gameEventModel = model<IGame>('GameEvents', gameEventSchema);

export default gameEventModel;