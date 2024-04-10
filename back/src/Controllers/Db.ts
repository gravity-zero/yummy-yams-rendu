import mongoose from 'mongoose';

let dbConnection: mongoose.Connection | null = null; // Garder une référence à la connexion pour éviter les connexions multiples

// Connexion à la base de données
export const connectDB = async () => {
    try {
        if (!dbConnection) {
            const dbUser=process.env.DB_USERNAME;
            const dbPass=process.env.DB_PASS;
            const dbHost=process.env.DB_HOST;
            await mongoose.connect(`mongodb://${dbUser}:${dbPass}@${dbHost}/bakery`, {
                authSource: 'admin'
            });
            console.log('Connexion success')
            dbConnection = mongoose.connection
        }
        return dbConnection;
    } catch (error: unknown) {
        //console.error('Database connection error:', error?.message: String);
        // Si une erreur survient lors de la connexion à la base de données, lancer une exception
        throw new Error('Unable to connect to the database');
    }
};