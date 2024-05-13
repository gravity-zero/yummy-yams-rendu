import { Request, Response, NextFunction } from 'express';
import { checkTokenAndValidity } from '../Helpers/JwtHelper';

function authenticateToken(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization']
    //console.log(authHeader);
    
    let token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        token = req.cookies.bakeryToken;
    }
  
    if (token == null) 
        return res.status(401)
                    .send({success: false, message: "Vous n'êtes pas connecté, impossible d'accèder à la ressource (1)"})        
  
    if(!checkTokenAndValidity(token))
        return res.status(401)
            .send({success: false, message: "Vous n'êtes pas connecté, impossible d'accèder à la ressource (2)"})
        
      req.body.token = token;
      next();
  }

export default authenticateToken;