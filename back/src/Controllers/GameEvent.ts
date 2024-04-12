import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { connectDB } from './Db'
import { decodePayload } from '../Helpers/JwtHelper';
import userModel from '../Models/User';
import pastriesModel from '../Models/Pastries';
import gameEventModel from '../Models/GameEvent';
import { IJwt } from '../Types/IJwt';
import { RollDices } from '../Helpers/DiceGameHelper';

const gameEventRouter = Router();

gameEventRouter.post('/game', async(req: Request, res: Response) => {
    await connectDB();

    const pastries = await pastriesModel.find({});    
    
    const payload: IJwt|null = decodePayload(req.body.token);

    if(!payload)
    {
        console.log("le middleware est passé mais le payload est null, we have a situation");
        return res.status(401).send("we have a situation");
    }

    const user = await userModel.findOne({email: payload?.user.email});
    console.log(user);
    
    if(!user){
        return res.status(401).send("we really have a situation");
    }

    const EventName = req.body.eventName;

    const event = await gameEventModel.findOne({ name: EventName, user: user?._id });
    console.log(pastries, event);

    if(!event)
    {
        const result: Array<number> = RollDices(5);
        console.log(result);
        
        return res.status(201).send("Il faut créer la première partie")
    }

    return res.status(201).send("on continu la partie et on retourne le résultat");
});

gameEventRouter.get('/game/:id', async(req: Request, res: Response) => {
    const db = await connectDB();
    const eventCollection = db.collection('GameEvents');


    res.send("ok")
})

export default gameEventRouter;