import { Router } from "express";
import { userControllers } from "./user.controller";

export const userRouter = Router();

userRouter.post("/register", userControllers.createUser)
userRouter.get("/allUsers", userControllers.getAllUsers)
