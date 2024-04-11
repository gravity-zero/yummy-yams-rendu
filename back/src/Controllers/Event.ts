import { Router, Request, Response, NextFunction } from 'express';
import { connectDB } from './Db'

const eventRouter = Router();

eventRouter.post('/game/new', async(req: Request, res: Response, next: NextFunction) => {
    const db = await connectDB();
    const eventCollection = db.collection('event');

    
    res.send("ok")
})

eventRouter.get('/game/:id', async(req: Request, res: Response, next: NextFunction) => {
    const db = await connectDB();
    const eventCollection = db.collection('event');


    res.send("ok")
})

eventRouter.patch('/game/:id', async(req: Request, res: Response, next: NextFunction) => {
    const db = await connectDB();
    const eventCollection = db.collection('event');


    res.send("ok")
})

export default eventRouter;