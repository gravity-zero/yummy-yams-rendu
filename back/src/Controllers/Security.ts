import { Router, Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import { connectDB } from './Db'

const login = Router();

login.post('', async(req: Request, res: Response) => {
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
            res.send({success: true, message: user}).status(200)
        } else {
            res.send({success: false, message: "Vous n'êtes pas connecté"}).status(404)
        }
    }
    res.send({success: false, message: "Vous n'êtes pas connecté"}).status(404)
    
})

export default login 