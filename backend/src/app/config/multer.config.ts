import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { cloudinaryUpload } from "./cloudinary.config";

const storage = new CloudinaryStorage({
    cloudinary: cloudinaryUpload,
    params: {
        public_id: (req, file) => {
            const fileName: string = file.originalname.toLocaleLowerCase()
                .replace(/\s+/g, "_")
                .replace(/\./g, "_")
                .replace(/[^a-z0-9\-\.]/g, ""); // non alpha numeric - !@#$
            const imageExtension = file.originalname.split(".").pop();

            const uniqueFileName = Math.random().toString(36).substring(2) + "_" + Date.now() + "_" + fileName + "." + imageExtension

            return uniqueFileName;
        }
    }
})

export const multerUpload = multer({ storage: storage })