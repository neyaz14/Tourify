import { HttpStatusCode } from "axios";
import AppError from "../../errorhelpers/AppError";
import { createNewAccessTokenWithRefreshToken, createUserTokens } from "../../utilis/userTokens";
import { IAuthProviders, IUser } from "../user/user.interface";

import { User } from "../user/user.model";
import bcryptjs from "bcryptjs"
import { envVars } from "../../config/env";
import { JwtPayload } from "jsonwebtoken";

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
    const newAccessToken = await createNewAccessTokenWithRefreshToken(refreshToken);
    return { accessToken: newAccessToken }

}

const logOutService = async () => {
    return undefined
}

// const googleCallbackService = async(user: Partial<IUser>)=>{
// //
// }

const resetPassword = async (oldPassword: string, newPassword: string, decodedToken: JwtPayload) => {

    const user = await User.findById(decodedToken.userId)

    if (user) {
        throw new AppError(HttpStatusCode.NotFound, "User not found")
    }

    const isOldPasswordMatch = await bcryptjs.compare(oldPassword, user!.password as string)
    if (!isOldPasswordMatch) {
        throw new AppError(HttpStatusCode.Unauthorized, "Old Password does not match");
    }

    user!.password = await bcryptjs.hash(newPassword, Number(envVars.Bycrypt_Salt))

    user!.save();


}

// * credentials 
// * -> create account 
// * -> login account 
// * 
// * Google 
// * => login
// * => 
// * 
// * 
// * 
// * 
// * 


// ? Google auth 
// const googleAuth = async ()=>{

// }


const setPassword = async (userId: string, plainPassword: string) => {
    const user = await User.findById(userId);
    if (!user) {
        throw new AppError(HttpStatusCode.NotFound, "User not Found")
    };

    if (user.password && user.auths.some(authProvider => authProvider.providers === "google")) {
        throw new AppError(HttpStatusCode.BadRequest, "You already have a password, now you can change the password")
    }
    
    const hashedPassword = await bcryptjs.hash(
        plainPassword,
        Number(envVars.Bycrypt_Salt)
    )

    const credentialProvider: IAuthProviders = {
        providers: "credentials",
        providerId: user.email
    }

    const auths: IAuthProviders[] = [...user.auths, credentialProvider]
    user.password = hashedPassword
    user.auths = auths
    await user.save()
}

export const authService = {
    credentialsLoginService, getNewAccessTokenService, logOutService, resetPassword, setPassword
}