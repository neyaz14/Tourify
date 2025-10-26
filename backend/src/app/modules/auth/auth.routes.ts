import { NextFunction, Request, Response, Router } from "express";
import { authControllers } from "./auth.controller";
import passport from "passport";

export const authRouter = Router();

authRouter.post('/login', authControllers.credentialsLoginController);
authRouter.post('/refreshToken', authControllers.getNewAccessTokenController);


authRouter.post('/logout', authControllers.logOutController);

authRouter.get("/googleLogin", async (req: Request, res: Response, next: NextFunction) => {
    try {
        passport.authenticate("google", { scope: ["profile", "email"] })(req, res, next)
    } catch (error) {
        console.log("Google login error - ", error);
    }
});

authRouter.get("/google/callback",
    passport.authenticate("google",
        { failureRedirect: "/login" }),
    authControllers.googleCallback)
