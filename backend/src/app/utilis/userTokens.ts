
import { envVars } from "../config/env";
import { IUser } from "../modules/user/user.interface";
import { generateJwtToken } from "./jwt";

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