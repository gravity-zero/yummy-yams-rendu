import jwt from 'jsonwebtoken';
import type { IUser } from "../Types/IUser";
import { IJwt } from '../Types/IJwt';

export const generateJwt = (payload: IJwt): string => {
    return jwt.sign(payload, process.env.JWT_SECRET as string, { algorithm: 'HS512' });
}

export const composePayload = (params: any): IJwt => {
    const exp = new Date();
    exp.setHours(exp.getHours() + 1);
    return {
        iat: new Date().getTime(),
        exp: exp.getTime(),
        user: { id: params?.id, email: params?.email, pseudo: params?.pseudo } as IUser 
    };
}

export const checkTokenAndValidity = (token: string): Boolean => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string, { algorithms: ['HS512'] });
        const now = new Date().getTime();
        const decodedObject = decoded as IJwt;
        
        return decodedObject.exp > now;
    } catch (err) {
        console.error('Invalid token', err)
        return false;
    }
}

export const decodePayload = (token: string): IJwt|null => {
    let payload = null;
    jwt.verify(token, process.env.JWT_SECRET as string, { algorithms: ['HS512'] },
        (error, decoded) => {
            if(decoded){
                payload = decoded;
            }
    });
    return payload;
}