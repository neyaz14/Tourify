import  { HttpStatusCode } from "axios";
import AppError from "../../errorhelpers/AppError";
import { createNewAccessTokenWithRefreshToken, createUserTokens } from "../../utilis/userTokens";
import { IAuthProviders, IsActive, IUser } from "../user/user.interface";

import { User } from "../user/user.model";
import bcryptjs from "bcryptjs"
import { envVars } from "../../config/env";
import jwt,{ JwtPayload } from "jsonwebtoken";
import { sendEmail } from "../../utilis/sendEmails";

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

const forgotPassword = async (email: string) => {
    const isUserExist = await User.findOne({ email });

    if (!isUserExist) {
        throw new AppError(HttpStatusCode.BadRequest, "User does not exist")
    }
    if (!isUserExist.isVerified) {
        throw new AppError(HttpStatusCode.BadRequest, "User is not verified")
    }
    if (isUserExist.isActive === IsActive.Block || isUserExist.isActive === IsActive.InActive) {
        throw new AppError(HttpStatusCode.BadRequest, `User is ${isUserExist.isActive}`)
    }
    if (isUserExist.isDeleted) {
        throw new AppError(HttpStatusCode.BadRequest, "User is deleted")
    }

    const jwtPayload = {
        userId: isUserExist._id,
        email: isUserExist.email,
        role: isUserExist.role
    }

    const resetToken = jwt.sign(jwtPayload, envVars.JWT_Secrect, {
        expiresIn: "10m"
    })

    const resetUILink = `${envVars.FRONTEND_URL}/reset-password?id=${isUserExist._id}&token=${resetToken}`

    sendEmail({
        to: isUserExist.email,
        subject: "Password Reset",
        templateName: "forgetPassword",
        templateData: {
            name: isUserExist.name,
            resetUILink
        }
    })

    /**
     * http://localhost:5173/reset-password?id=687f310c724151eb2fcf0c41&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODdmMzEwYzcyNDE1MWViMmZjZjBjNDEiLCJlbWFpbCI6InNhbWluaXNyYXI2QGdtYWlsLmNvbSIsInJvbGUiOiJVU0VSIiwiaWF0IjoxNzUzMTY2MTM3LCJleHAiOjE3NTMxNjY3Mzd9.LQgXBmyBpEPpAQyPjDNPL4m2xLF4XomfUPfoxeG0MKg
     */
}


const resetPassword = async (payload: Record<string, any>, decodedToken: JwtPayload) => {
    if (payload.id != decodedToken.userId) {
        throw new AppError(401, "You can not reset your password")
    }

    const isUserExist = await User.findById(decodedToken.userId)
    if (!isUserExist) {
        throw new AppError(401, "User does not exist")
    }

    const hashedPassword = await bcryptjs.hash(
        payload.newPassword,
        Number(envVars.Bycrypt_Salt)
    )

    isUserExist.password = hashedPassword;

    await isUserExist.save()
}


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

const changePassword = async (oldPassword: string, newPassword: string, decodedToken: JwtPayload) => {

    const user = await User.findById(decodedToken.userId)

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




export const authService = {
    credentialsLoginService,
    getNewAccessTokenService,
    logOutService,

    changePassword,
    forgotPassword,
    resetPassword,
    setPassword
}
