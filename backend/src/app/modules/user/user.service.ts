import bcrypt from "bcryptjs";
import { IAuthProviders, IsActive, IUser, Role } from "./user.interface";
import { User } from "./user.model";
import { JwtPayload } from "jsonwebtoken";
import AppError from "../../errorhelpers/AppError";
import httpsCode from "http-status-codes"
import { envVars } from "../../config/env";

const createUserService = async (payload: Partial<IUser>) => {

    const { name, email, password, ...rest } = payload;

    const isUserExist = await User.findOne({ email })
    if (isUserExist) {
        throw new Error("User alredy exists")
    } else {

        // * hashpassword
        const hashedpassword = await bcrypt.hash(password as string, 10)


        const authProvider: IAuthProviders = {
            providers: "credentials",
            providerId: email as string
        }
        const newUser = await User.create({
            name, email,
            auths: [authProvider],
            password: hashedpassword
            , ...rest
        });

        // console.log(newUser);
        return newUser;
    }

}



const getAllUsersService = async () => {
    const allUsers = await User.find({});
    return allUsers;
}

// update user service 
const updateUserService = async (userId: string, payload: Partial<IUser>, decodedToken: JwtPayload) => {

    // check if user exists 
    const isUserExists = await User.findById(userId);
    if (!isUserExists) {
        throw new AppError(httpsCode.NOT_FOUND, "User does not exists")
    }

    
    // verify role 
    // then allow them to update the user data
    if (payload.role) {
        if (decodedToken.role === Role.Guide || decodedToken.role === Role.User) {
            throw new AppError(httpsCode.FORBIDDEN, "You are not allowed")
        }

        if (decodedToken.role === Role.Admin || decodedToken.role === Role.Super_Admin) {
            throw new AppError(httpsCode.FORBIDDEN, "You are not allowed")
        }
    }

    // isActive or isValid
    if (payload.isActive || payload.isDeleted || payload.isVerified) {
        if (decodedToken.role === Role.Guide || decodedToken.role === Role.Super_Admin) {
            throw new AppError(httpsCode.FORBIDDEN, "You are not allowed")
        }
    }

    if (payload.password) {
        payload.password = await bcrypt.hash(payload.password, envVars.Bycrypt_Salt)
    }
    const newUpdatedUser = await User.findByIdAndUpdate(userId, payload, { new: true, runValidators: true });
    // console.log(newUpdatedUser);

    return newUpdatedUser;
}

export const userServices = {
    createUserService, getAllUsersService, updateUserService
}