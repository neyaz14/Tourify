import passport from "passport";
import { Strategy as GoogleStrategy, Profile, VerifyCallback } from "passport-google-oauth20";
import { envVars } from "./env";
import { User } from "../modules/user/user.model";
import { IsActive, Role } from "../modules/user/user.interface";
import { Strategy as LocalStrategy, VerifyFunction } from "passport-local";
import bcryptjs from "bcryptjs"


passport.use(
    new GoogleStrategy(
        {
            clientID: envVars.GOOGLE_CLIENT_ID,
            clientSecret: envVars.GOOGLE_CLIENT_SECRET,
            callbackURL: envVars.GOOGLE_CALLBACK_URL
        },
        async (accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback) => {
            try {
                //

                const email = profile.emails?.[0].value;
                if (!email) {
                    console.log('No email found');
                    return done(null, false, { message: "No email found " })
                }
                let user = await User.findOne({ email })
                if (!user) {
                    //create a new user and register it

                    user = await User.create({
                        email,
                        name: profile.name?.givenName,
                        picture: profile.profileUrl,
                        auths: [{
                            providerId: profile.id,
                            providers: "google"
                        }],
                        role: Role.User,
                        isActive: IsActive.Active
                    })
                    console.log("a new user created form while login to with google --", user);
                    return done(null, user, { message: 'User created' })
                }

            } catch (error) {
                console.log("Google passport oauth login error-- !!--", error);
                return done(error)
            }
        }
    )
)

passport.use(
    new LocalStrategy({
        passwordField: "password",
        usernameField: "email"
    }, async (email: string, password: string, done) => {
        try {
            const isUserExists = await User.findOne({ email });
            if (!isUserExists) {
                return done(null, false, { message: "User Doesnot exists" })
            };
            // ! check if it has only google auth provider
            const isGoogleAuth = isUserExists.auths.some(providerObject => providerObject.providers === "google");
            console.log(isGoogleAuth);
            if (isGoogleAuth) {
                return done(null, false, { message: "You are only login with Google provider.to login with password with this email you have to set a password first " })
            }


            const isPassMatched = await bcryptjs.compare(password as string, isUserExists.password as string)
            if (!isPassMatched) {
                return done(null, false, { message: 'Password doesnot match' })
            }

            return done(null, isUserExists, { message: 'User logged in successfully' })

        } catch (error) {
            console.log(error);
            return done(error)
        }
    })
)

passport.serializeUser((user: any, done: (err: any, id?: unknown) => void) => {
    done(null, user._id)
})
passport.deserializeUser(async (id: string, done: any) => {
    try {
        const user = await User.findById(id)
        done(null, user)
    } catch (error) {
        console.log(error);
        done(error)
    }
})