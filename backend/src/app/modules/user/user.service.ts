import bcrypt from "bcryptjs";
import { IAuthProviders, IUser } from "./user.interface";
import { User } from "./user.model";

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

        console.log(newUser);
        return newUser;
    }

}



const getAllUsersService = async () => {
    const allUsers = await User.find({});
    return allUsers;
}

export const userServices = {
    createUserService, getAllUsersService
}