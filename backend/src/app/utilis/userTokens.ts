
import { JwtPayload } from "jsonwebtoken";
import { envVars } from "../config/env";
import { IsActive, IUser } from "../modules/user/user.interface";
import { generateJwtToken, verifyToken } from "./jwt";
import { User } from "../modules/user/user.model";
import AppError from "../errorhelpers/AppError";
import https from "http-status-codes"


export const createUserTokens = (user: Partial<IUser>) => {
    const jwtPayload = {
        id: user._id,
        email: user.email,
        role: user.role
    }

    const accessToken = generateJwtToken(jwtPayload, envVars.JWT_Secrect, "1d");
    // console.log(accessToken);
    // * Refresh token 
    const refreshToken = generateJwtToken(jwtPayload, envVars.JWT_REFRESH_SECRECT, envVars.JWT_REFRESH_TIME);

    return { accessToken, refreshToken }
}

// ! using refresh token create a new access token 
export const createNewAccessTokenWithRefreshToken = async(refreshToken: string) => {
    
    const verifiedRefreshToken = verifyToken(refreshToken, envVars.JWT_REFRESH_SECRECT) as JwtPayload;
    console.log('verifiedRefreshToken', verifiedRefreshToken);

    const isUserExists = await User.findOne({ email: verifiedRefreshToken.email });

    if (!isUserExists) {
        throw new AppError(https.BAD_REQUEST, "User doesnot exists")
    }
    if (isUserExists.isActive === IsActive.Block || isUserExists.isActive === IsActive.InActive) {
        throw new AppError(https.BAD_REQUEST, `User is ${isUserExists.isActive}`)
    }
    if (isUserExists.isDeleted) {
        throw new AppError(https.BAD_REQUEST, "User is deleted")
    }

    const jwtAccessTokenPayload: JwtPayload = {
        userId: isUserExists._id,
        email: isUserExists.email,
        role: isUserExists.role
    }
    const accessToken = generateJwtToken(jwtAccessTokenPayload, envVars.JWT_Secrect, "1d")

    return { accessToken }
}