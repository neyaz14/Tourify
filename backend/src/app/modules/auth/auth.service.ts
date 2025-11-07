import { createNewAccessTokenWithRefreshToken, createUserTokens } from "../../utilis/userTokens";
import { IUser } from "../user/user.interface";

import { User } from "../user/user.model";
import bcryptjs from "bcryptjs"

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

const googleCallbackService = async(user: Partial<IUser>)=>{
//
}


export const authService = {
    credentialsLoginService, getNewAccessTokenService, logOutService, googleCallbackService
}