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
    let isValid = false;
    jwt.verify(token, process.env.JWT_SECRET as string, { algorithms: ['HS512'] },
         (error, decoded) => {
            if(decoded){
                const now: number = new Date().getTime();
                const decodedObject = decoded as IJwt;
                isValid = decodedObject.exp > now;
            }
    });
    return isValid;
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