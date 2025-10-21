import { Router } from "express";
import { authControllers } from "./auth.controller";

export const authRouter = Router();

authRouter.post('/login', authControllers.credentialsLoginController)
authRouter.post('/refreshToken', authControllers.getNewAccessTokenController)