import { Schema, model, Document } from 'mongoose';
import type { IEvent } from '../Types/IEvent';

// Définir le schéma
const eventSchema = new Schema<IEvent>({
    name: { type: String, required: true },
    points: { type: Number, required: true },
    date: { type: Date, default: Date.now }
});

// Créer le modèle à partir du schéma
const eventModel = model<IEvent>('Event', eventSchema);

export default eventModel;