import passport from "passport";
import { Strategy as GoogleStrategy, Profile, VerifyCallback } from "passport-google-oauth20";
import { envVars } from "./env";
import { User } from "../modules/user/user.model";
import { IsActive, Role } from "../modules/user/user.interface";


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