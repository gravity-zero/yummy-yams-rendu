import { Router, Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { IJwt } from '../Types/IJwt';

// const router = Router();

// router.get('', authenticateToken, async (req, res, next) => {
//     console.log("api routeur");
    
//     res.send("toto");
// });

function authenticateToken(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization']
    let token = authHeader && authHeader.split(' ')[1]
    
    if (!token) {
        token = req.cookies.bakeryToken;
    }
  
    if (token == null) return res.sendStatus(401)
  
    jwt.verify(token, process.env.JWT_SECRET as string, { algorithms: ['HS512'] }, (err: any, payload: any) => {
    if (err) {
        console.error(err);
        return res.status(401).send({ success: false, message: 'Token JWT invalide' });
    }
  
      console.log("payload ....", payload);
      
      next()
    })
  }

export default authenticateToken;