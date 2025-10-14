import dotenv from "dotenv";

dotenv.config();

interface EnvVars {
    PORT: string,
    DBURL: string,
    NODE_ENV: "development" | "production",
    JWT_Secrect: string,
    Super_Admin_email :string,
    Super_Admin_password :string
}

const loadEnvVariables = (): EnvVars => {
const requiredEnvVar: string[] = ["PORT", "DBURL", "NODE_ENV"];
requiredEnvVar.forEach(key=>{
    if(!process.env[key]){
        throw new Error(`Missing requried env ${key}`)
    }
})
    return {
        PORT: process.env.PORT as string,
        DBURL: process.env.DBURL ,
        NODE_ENV: process.env.NODE_ENV as "development" | "production",
        JWT_Secrect: process.env.JWT_Secrect as string,
        Super_Admin_email : process.env.Super_Admin_email as string,
        Super_Admin_password: process.env.Super_Admin_password as string
    }

}
loadEnvVariables()


export const envVars: EnvVars = {
    PORT: process.env.PORT,
    DBURL: process.env.DBURL,
    NODE_ENV: process.env.NODE_ENV,
    JWT_Secrect: process.env.JWT_Secrect,
    Super_Admin_email : process.env.Super_Admin_email,
    Super_Admin_password: process.env.Super_Admin_password
}

