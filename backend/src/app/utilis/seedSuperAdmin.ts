import { envVars } from "../config/env";
import { IAuthProviders, Role } from "../modules/user/user.interface";
import { User } from "../modules/user/user.model";
import bcrypt from "bcryptjs"
export const seedSuperAdmin = async () => {
    try {
        // check if supperAdmin exists 
        const isSuperAdminExists = await User.find({ role: Role.Super_Admin });
        const isSeedSuperAdminExists = await User.findOne({ email: envVars.Super_Admin_email })

        if (isSuperAdminExists.length !==0 || isSeedSuperAdminExists) {
            console.log(isSeedSuperAdminExists, isSuperAdminExists);
            console.log("there is a supper admin ");
            return ; 
        } else {
            // create a supperAdmin 
            const authProvider: IAuthProviders = {
                providers: "credentials",
                providerId: envVars.Super_Admin_email as string
            }

            const hashedPassword = await bcrypt.hash(envVars.Super_Admin_password, 10)

            const CreatedsuperAdmin = await User.create({
                email: envVars.Super_Admin_email,
                password: hashedPassword,
                name: "SuperAdmin Seed Data",
                auths: [authProvider],
                role: Role.Super_Admin,
                isVerified: true
            })
            console.log("Super admin created successfully", CreatedsuperAdmin);
            // return CreatedsuperAdmin;
        }

    } catch (error) {
        console.log(error);
    }
}