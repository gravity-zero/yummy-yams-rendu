import express, { json } from 'express';
import router from './Controllers/AuthMiddleware';
import login from './Controllers/Security';
import { connectDB } from './Controllers/Db';
import userModel from './Models/User';
import eventModel from './Models/Event';

// try {
//     await connectDB()

//     console.log('Database connected successfully');
// } catch (error) {
//     console.log(error)
// }

const app = express();

app.use(json());

app.get('/initWorld', async (req, res) => {
  await connectDB();
  await userModel.createCollection();
  await eventModel.createCollection();
  res.send('ok')
})

app.use('/security/login', login);
app.use('/api', router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});