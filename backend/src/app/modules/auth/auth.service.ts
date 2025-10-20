import { envVars } from "../../config/env";
import { generateJwtToken } from "../../utilis/jwt";
import { IUser } from "../user/user.interface"
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

        const accessToken = generateJwtToken({ email, id, role }, envVars.JWT_Secrect, "1d");
        // console.log(accessToken);

        return {
            userInfo, accessToken
        }
    } else {

        throw new Error("Password incorrect")
    }



}

export const authService = {
    credentialsLoginService
}