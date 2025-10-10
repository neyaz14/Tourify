import { IUser } from "./user.interface";
import { User } from "./user.model";

const createUserService =async (payload: Partial<IUser>)=>{

    const {name, email}= payload;
    const newUser = await User.create({name, email});
    return newUser;
}


const getAllUsersService = async ()=>{
    const allUsers = await User.find({});
    return allUsers; 
}

export const userServices = {
    createUserService, getAllUsersService
}