import { v2 as cloudinary } from "cloudinary";
import { envVars } from "./env";

cloudinary.config({
    cloud_name: envVars.CLOUDINARY.CLOUDINARY_CLOUDE_NAME,
    api_key: envVars.CLOUDINARY.CLOUDINARY_API_KEY,
    api_secret: envVars.CLOUDINARY.CLOUDINARY_API_SECRECT
})

// const uploadToCloudinary =()=>{

// }

export const cloudinaryUpload = cloudinary