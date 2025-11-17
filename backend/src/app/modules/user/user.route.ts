import { Router } from "express";
import { userControllers } from "./user.controller";
import { createUserZodSchema } from "./userZodSchema"

import { validateRequest } from "../../middlewares/validateZodRequest";

import { Role } from "./user.interface";

import { checkAuth } from "../../middlewares/checkAuth";
export const userRouter = Router();




// TODO : Create user propfile picture related things 
// ! we also need to create something like - user profile settings 
 

userRouter.post("/register", validateRequest(createUserZodSchema), userControllers.createUser);

userRouter.get("/allUsers", checkAuth(Role.Admin, Role.Super_Admin), userControllers.getAllUsers)

userRouter.patch("/:id",checkAuth(...Object.values(Role)) ,userControllers.updateUser)