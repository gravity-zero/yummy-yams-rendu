import { Request, Response, NextFunction } from 'express';
import { checkTokenAndValidity } from '../Helpers/JwtHelper';

function authenticateToken(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization']
    let token = authHeader && authHeader.split(' ')[1]
    
    if (!token) {
        token = req.cookies.bakeryToken;
    }
  
    if (token == null) 
        return res.status(401)
                    .send({success: false, message: "Vous n'êtes pas connecté, impossible d'accèder à la ressource"})        
  
    if(!checkTokenAndValidity(token))
        return res.status(401)
            .send({success: false, message: "Vous n'êtes pas connecté, impossible d'accèder à la ressource"})
        
      req.body.token = token;
      next();
  }

export default authenticateToken;