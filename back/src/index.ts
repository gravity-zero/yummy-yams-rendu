import express, { json } from 'express';
import router from './Controllers/AuthMiddleware';
import login from './Controllers/Security';
//import { connectDB } from './controllers/Db.js';

// try {
//     await connectDB()

//     console.log('Database connected successfully');
// } catch (error) {
//     console.log(error)
// }

const app = express();

app.use(json());
app.use('/security/login', login);
app.use('/api', router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});