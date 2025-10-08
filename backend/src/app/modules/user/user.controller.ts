import { Request, Response } from "express";
import { User } from "./user.model";

 const createUser = async (req: Request, res: Response) => {
    try {
        const { name, email } = req.body;
        const newUser = await User.create({
            name,
            email
        })

        res.status(201).json({
            message: `User created successfuly !!`,
            newUser
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: `something with wrong, ${error.message}`,
            error
        })
    }
}

export const userControllers = { createUser}