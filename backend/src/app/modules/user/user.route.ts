import { Router } from "express";
import { userControllers } from "./user.controller";
import { createUserZodSchema } from "./userZodSchema"

import { validateRequest } from "../../middlewares/validateZodRequest";
export const userRouter = Router();


userRouter.post("/register", validateRequest(createUserZodSchema), userControllers.createUser);

userRouter.get("/allUsers", userControllers.getAllUsers)
