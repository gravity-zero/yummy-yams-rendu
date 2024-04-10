import { Router, Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const router = Router();

router.get('', authenticateToken, async (req, res) => {
    console.log("api routeur");
    
    res.send("toto");
});

router.post('/user', async (req, res) => {
    console.log("Créa User");
})

function authenticateToken(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
  
    if (token == null) return res.sendStatus(401)
  
    jwt.verify(token, process.env.JWT_SECRET as string, { algorithms: ['HS256'] }, (err: any, user: any) => {
      console.log(err)
  
      if (err) return res.sendStatus(403)
  
      console.log(user);
      
  
      next()
    })
  }

export default router;