import express, { json } from 'express';
import authenticateToken from './Controllers/AuthMiddleware';
import userRouter from './Controllers/User';
import gameEventRouter from './Controllers/GameEvent';
import { connectDB } from './Controllers/Db';
import userModel from './Models/User';
import gameEventModel from './Models/GameEvent';
import cookieParser from 'cookie-parser';

const app = express();

app.use(json());
app.use(cookieParser());

app.get('/initWorld', async (req, res) => {
  await connectDB();
  await userModel.createCollection();
  await gameEventModel.createCollection();
  res.send('ok');
})

app.use('/user', userRouter);

app.use('/api', authenticateToken, gameEventRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});