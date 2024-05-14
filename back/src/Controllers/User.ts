import { Router, Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import { connectDB } from './Db';
import userModel from '../Models/User';
import { composePayload, generateJwt } from '../Helpers/JwtHelper';
import { IUser } from '../Types/IUser';

const userRouter = Router();

userRouter.post('/register', async(req: Request, res: Response) => {

    
    const db = await connectDB();
    
    const collection = db.collection('users')
    
    const email = req.body.email
    const password = req.body.password
    const pseudo = req.body.pseudo

    
    if(!email || !password || !pseudo)
        return res.status(404)
    .send({success: false, message: "Pas d'email, pas de password ou pas de pseudo = pas de chocolat <3"})   
    
    let user = await userModel.findOne({
        $or: [
          { email },
          { pseudo },
        ],
      });
    
    if(user)
        return res.status(404)
    .send({success: false, message: "Impossible d'enregistrer cette utilisateur"})
    
    const result = await userModel.create(
        { email: email,
            pseudo: pseudo,
            password: bcrypt.hashSync(password, 10),
            createdAt: new Date()
        });
    
    if (!result?._id.toString())
        return res.status(404)
                    .send({success: false, message: "Impossible d'enregistrer cette utilisateur"})

    const token: string = generateJwt(composePayload({id: result?._id.toString(), email: email, pseudo: pseudo}));

    return res.cookie('bakeryToken', token, { httpOnly: true })
                .status(200)
                    .send({ success: true, message: {token: token }});
});

userRouter.post('/login', async(req: Request, res: Response) => {
    const db = await connectDB();

    const collection = db.collection('users')

    const email = req.body.email
    const password = req.body.password

    if(!email || !password)
    {
        return res.status(404)
                    .send({success: false, message: "Pas d'email ou pas de password = pas de chocolat <3"})
    }    

    const user: IUser|null = await userModel.findOne({ email: email });
    
    if (user)
    {
        const passwordMatch = await bcrypt.compare(password, user.password);
        
        if (passwordMatch) {
            const token: string = generateJwt(composePayload({email: user.email, pseudo: user.pseudo}));
            return res.cookie('bakeryToken', token, { httpOnly: true })
                        .status(200)
                            .send({success: true, message: {token: token }})
        }
    }
    return res.status(401)
                .send({success: false, message: "login ou password incorrect"})
    
})

export default userRouter 