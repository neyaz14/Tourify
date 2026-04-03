// src/modules/otp/otp.routes.ts
import express from "express";
import { OTPController } from "./otp.controller";

export const otpRouteer = express.Router();

otpRouteer.post("/send", OTPController.sendOTP);
otpRouteer.post("/verify", OTPController.verifyOTP);

