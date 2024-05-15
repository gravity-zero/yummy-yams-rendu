import { Router, Request, Response } from 'express';
import { connectDB } from './Db';
import { Document } from 'mongoose';
import { decodePayload } from '../Helpers/JwtHelper';
import userModel from '../Models/User';
import pastriesModel from '../Models/Pastries';
import gameEventModel from '../Models/GameEvent';
import { IJwt } from '../Types/IJwt';
import { RollDices, checkCombination } from '../Helpers/DiceGameHelper';
import { getRandomPastries } from '../Helpers/GameEventHelper';
import { IPastries } from '../Types/IPastries';
import { IGame } from '../Types/IGame';

const gameEventRouter = Router();

gameEventRouter.post('/', async(req: Request, res: Response) => {
    await connectDB();
    
    const payload: IJwt|null = decodePayload(req.body.token);

    if(!payload)
    {
        return res.status(401).send("miss some informations");
    }

    const user = await userModel.findOne({email: payload?.user.email});
    
    if(!user){
        return res.status(401).send("we really have a situation");
    }

    const EventName = req.body.eventName;

    if(EventName !== 'pastries_game')
    {
        return res.status(404).send("Le jeu en cours est pastries_game");
    }

    const pastries = await pastriesModel.find({ $expr: { $lt : [ '$quantityWon', '$stock' ] }});
    
    if (!pastries || pastries.length === 0) {
        return res.status(200).send("Plus aucune pâtisserie disponible, le jeu est terminé");
    }
    
    const event: null|IGame = await gameEventModel.findOne({ 'event.name': EventName, user: user?._id });

    const diceResults: Array<number> = RollDices(5);

    const result = checkCombination(diceResults);

    let prices: Array<IPastries>|null = null;
    
    switch (result) {
        case "YAM'S":
            prices = getRandomPastries(3 ,pastries);
            break;
        case "CARRÉ":
            prices = getRandomPastries(2 ,pastries);
            break;
        case "DOUBLE":
            prices = getRandomPastries(1 ,pastries);
            break;
        default:
            break;
    }

    if(!event)
    {
        await gameEventModel.create({
            event: { name: EventName },
            user: user?._id,
            points: diceResults,
            nbSubmitions: prices && prices.length > 0 ? 3 : 1, // si on à un ou plusieurs Prix, on arrête le jeu, sinon + 1
            prices: prices
        });
    } else if (event.nbSubmitions < 3){
        await gameEventModel.updateOne(
            { _id: event?._id },
            { 
                points: diceResults, 
                nbSubmitions: prices && prices.length > 0 ? 3 : event.nbSubmitions + 1, // si on à un ou plusieurs Prix, on arrête le jeu, sinon +1 sur la valeur actuel
                 prices: prices
            });
    }

    const isEndGame =  !(event && event.nbSubmitions >= 3) ?? false;
    const responseData = { 
        success: isEndGame,
        message: isEndGame ? 'OK' : 'Fin de partie' ,
        infos: { 
            score: isEndGame ? diceResults : null,
            prices:  isEndGame ? prices?.map((item) => ({ name: item?.name, image: item?.image })) : null,
            result: isEndGame ? result : null
        }
    };

  res.status(isEndGame ? 201 : 200).send(responseData);
});

export default gameEventRouter;
