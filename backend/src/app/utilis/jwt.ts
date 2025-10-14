import jwt, { JwtPayload, SignOptions } from "jsonwebtoken"


export const generateJwtToken = (payload: JwtPayload, secret: string, experiedIn: string) => {

    const accessToken = jwt.sign(payload, secret, { expiresIn: experiedIn } as SignOptions)
    return accessToken;
}

export const verifyToken = (token ,secrectKey)=>{
    const verifyToken = jwt.verify(token, secrectKey);
    return verifyToken
}

