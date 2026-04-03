import crypto from "crypto";
import { RedisClient } from "../../config/redis.config";
import { sendEmail } from "../../utilis/sendEmails";
import AppError from "../../errorhelpers/AppError";
import { User } from "../user/user.model";


const otp_expiration = 2*60; // 2 minute

const generateOtp = (length = 6)=>{
    const otp = crypto.randomInt(10*(length-1),10**length) // it will 
    console.log(otp);

    return otp;
}

const sendOTP = async(email: string , name: string)=>{
    const user = await User.findOne({ email })

    if (!user) {
        throw new AppError(404, "User not found")
    }

    if (user.isVerified) {
        throw new AppError(401, "You are already verified")
    }
    const otp = generateOtp();

    const redisKey = `otp:${email}`
    console.log(redisKey);

    // await RedisClient.set(redisKey, otp, {
    //     expiration: {
    //         type: "EX",
    //         value: otp_expiration
    //     }
    // })
    await RedisClient.set(redisKey, (otp).toString(), {
        EX: otp_expiration    // <-- Correct way
    });
    await sendEmail({
        to: email,
        subject: "Your OTP Code",
        templateName: "otp",
        templateData: {
            name: name,
            otp: otp
        }
    })
}
const verifyOTP = async(email: string , name: string)=>{
    const otp = generateOtp();
}

export const OTPService = {
    sendOTP,
    verifyOTP
}