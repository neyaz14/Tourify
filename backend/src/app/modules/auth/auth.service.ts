
import { JwtPayload } from "jsonwebtoken";
import { envVars } from "../../config/env";
import AppError from "../../errorhelpers/AppError";
import { generateJwtToken, verifyToken } from "../../utilis/jwt";
import { createUserTokens } from "../../utilis/userTokens";
import { IsActive, IUser } from "../user/user.interface"
import { User } from "../user/user.model";
import bcryptjs from "bcryptjs"
import https from "http-status-codes"



const credentialsLoginService = async (payload: Partial<IUser>) => {

    const { email, password } = payload;
    // check if user exists
    const isUserExists = await User.findOne({ email });
    if (!isUserExists) {
        throw new Error("email does not exist");
    }

    const isPassMatched = await bcryptjs.compare(password as string, isUserExists.password as string)

    // console.log(isPassMatched);
    if (isPassMatched) {
        const { name, email, id, isActive, isVerified, isDeleted, auths, role } = isUserExists;
        const userInfo = { name, email, id, isActive, isVerified, isDeleted, auths, role }


        const userTokens = createUserTokens(isUserExists)

        return {
            userInfo, accessToken: userTokens.accessToken, refreshToken: userTokens.refreshToken
        }
    } else {

        throw new Error("Password incorrect")
    }



}

const getNewAccessTokenService = async (refreshToken: string) => {
    const verifiedRefreshToken = verifyToken(refreshToken, envVars.JWT_REFRESH_SECRECT) as JwtPayload;
    console.log('verifiedRefreshToken',verifiedRefreshToken);

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

export const authService = {
    credentialsLoginService, getNewAccessTokenService
}