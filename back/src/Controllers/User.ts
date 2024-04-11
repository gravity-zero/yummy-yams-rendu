import { Router, Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { connectDB } from './Db'
import { IJwt } from '../Types/IJwt';
import { IUser } from '../Types/IUser';

const userRouter = Router();

userRouter.post('/register', async(req: Request, res: Response) => {

    const db = await connectDB();

    const collection = db.collection('user')

    const email = req.body.email
    const password = req.body.password
    const pseudo = req.body.pseudo

    if(!email || !password || !pseudo)
    {
        res.send({success: false, message: "Pas d'email ou pas de password ou pas de pseudo = pas de chocolat <3"}).status(404)
    }    

    const user = await collection.findOne({ email: email });

    if(!user)
    {
        await collection.insertOne({ email: email, pseudo: pseudo, password: password });
    }

    const payload: IJwt = {
        iat: new Date().getTime(),
        user: { email: email, pseudo: pseudo } as IUser // Peut-être que vous devez ajuster ici en fonction de votre IUser
    };    

    const token: string = jwt.sign(payload, process.env.JWT_SECRET as string, { algorithm: 'HS512' });

    res.cookie('bakeryToken', token, { httpOnly: true })
        .status(200)
            .send({ success: true, token: token });
});

userRouter.post('/login', async(req: Request, res: Response) => {
    const db = await connectDB();

    const collection = db.collection('user')

    const email = req.body.email
    const password = req.body.password

    if(!email || !password)
    {
        res.send({success: false, message: "Pas d'email ou pas de password = pas de chocolat <3"}).status(404)
    }    

    const user = await collection.findOne({ email: email });

    if(user)
    {
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
            //TODO Generation JWT + COOKIE
            res.status(200).send({success: true, message: user})
        } else {
            res.status(200).send({success: false, message: "Vous n'êtes pas connecté"})
        }
    }
    res.status(404).send({success: false, message: "Vous n'êtes pas connecté"})
    
})

export default userRouter 