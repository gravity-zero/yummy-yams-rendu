import express, { json } from 'express';
import authenticateToken from './Controllers/AuthMiddleware';
import userRouter from './Controllers/User';
import eventRouter from './Controllers/Event';
import { connectDB } from './Controllers/Db';
import userModel from './Models/User';
import eventModel from './Models/Event';
import cookieParser from 'cookie-parser';

// try {
//     await connectDB()

//     console.log('Database connected successfully');
// } catch (error) {
//     console.log(error)
// }

const app = express();

app.use(json());
app.use(cookieParser());

app.get('/initWorld', async (req, res) => {
  await connectDB();
  await userModel.createCollection();
  await eventModel.createCollection();
  res.send('ok')
})

app.use('/user', userRouter);

app.use('/api', authenticateToken, eventRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});