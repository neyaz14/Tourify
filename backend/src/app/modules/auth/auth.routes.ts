import { NextFunction, Request, Response, Router } from "express";
import { authControllers } from "./auth.controller";
import passport from "passport";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";

export const authRouter = Router();

authRouter.post('/login', authControllers.credentialsLoginController);

authRouter.post('/refreshToken', authControllers.getNewAccessTokenController);


authRouter.post('/logout', authControllers.logOutController);


// ! google Passportjs Login 
// * Google Login 
authRouter.get("/googleLogin", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const redirect = req.query || '/';
        passport.authenticate("google", { scope: ["profile", "email"], state: redirect as string })(req, res, next)
    } catch (error) {
        console.log("Google login error - ", error);
    }
});
// * Google callback url
authRouter.get("/google/callback",
    passport.authenticate("google",
        { failureRedirect: "/login" }),
    authControllers.googleCallback)



// ! Passwrod Related 
// * setPassword - for google auth login user only
authRouter.post('/setPassword', checkAuth(Role.Admin, Role.Guide, Role.Super_Admin, Role.User), authControllers.setPasswordController);

// * resetPassword 
authRouter.post('/resetPassword', authControllers.resetPassword)
// * change password 
// * forget password 