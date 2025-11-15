import dotenv from "dotenv";

dotenv.config();

interface EnvVars {
  PORT: string;
  DBURL: string;
  NODE_ENV: "development" | "production";
  JWT_Secrect: string;
  Super_Admin_email: string;
  Super_Admin_password: string;
  Bycrypt_Salt: number;
  JWT_REFRESH_SECRECT: string;
  JWT_REFRESH_TIME: string;
  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: string;
  FRONTEND_URL: string;
  GOOGLE_CALLBACK_URL: string;
  EXPRESS_SESSION_SECRECT: string;
  SSL: {
    SSL_STORE_ID: string,
    STORE_PASS: string,
    SSL_PAYMENT_API: string,
    SSL_VALIDATION_API: string,
    SSL_SUCCESS_FRONTEND_URL: string,
    SSL_FAIL_FRONTEND_URL: string,
    SSL_CANCEL_FRONTEND_URL: string,
    SSL_SUCCESS_BACKEND_URL: string,
    SSL_FAIL_BACKEND_URL: string,
    SSL_CANCEL_BACKEND_URL: string,
  },
  CLOUDINARY: {
    CLOUDINARY_CLOUDE_NAME: string,
    CLOUDINARY_API_KEY: string
    CLOUDINARY_API_SECRECT: string

  }

}

const loadEnvVariables = (): EnvVars => {
  const requiredEnvVar: string[] = [
    "PORT",
    "DBURL",
    "NODE_ENV",
    "JWT_Secrect",
    "Super_Admin_email",
    "Super_Admin_password",
    "Bycrypt_Salt",
    "JWT_REFRESH_TIME",
    "JWT_REFRESH_SECRECT",
    "GOOGLE_CLIENT_ID",
    "GOOGLE_CLIENT_SECRET",
    "FRONTEND_URL",
    "GOOGLE_CALLBACK_URL",
    "EXPRESS_SESSION_SECRECT",

    "SSL_STORE_ID",
    "SSL_STORE_PASS",
    "SSL_PAYMENT_API",
    "SSL_VALIDATION_API",

    "SSL_SUCCESS_FRONTEND_URL",
    "SSL_FAIL_FRONTEND_URL",
    "SSL_CANCEL_FRONTEND_URL",

    "SSL_SUCCESS_BACKEND_URL",
    "SSL_FAIL_BACKEND_URL",
    "SSL_CANCEL_BACKEND_URL",

    "CLOUDINARY_CLOUDE_NAME",
    "CLOUDINARY_API_KEY",
    "CLOUDINARY_API_SECRECT"
  ];

  requiredEnvVar.forEach((key) => {
    if (!process.env[key]) {
      throw new Error(`Missing required env ${key}`);
    }
  });

  return {
    PORT: process.env.PORT as string,
    DBURL: process.env.DBURL as string,
    NODE_ENV: process.env.NODE_ENV as "development" | "production",
    JWT_Secrect: process.env.JWT_Secrect as string,
    Super_Admin_email: process.env.Super_Admin_email as string,
    Super_Admin_password: process.env.Super_Admin_password as string,
    Bycrypt_Salt: Number(process.env.Bycrypt_Salt),
    JWT_REFRESH_TIME: process.env.JWT_REFRESH_TIME as string,
    JWT_REFRESH_SECRECT: process.env.JWT_REFRESH_SECRECT as string,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID as string,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET as string,
    FRONTEND_URL: process.env.FRONTEND_URL as string,
    GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL as string,
    EXPRESS_SESSION_SECRECT: process.env.EXPRESS_SESSION_SECRECT as string,

    SSL: {
      SSL_STORE_ID: process.env.SSL_STORE_ID as string,
      STORE_PASS: process.env.SSL_STORE_PASS as string,
      SSL_PAYMENT_API: process.env.SSL_PAYMENT_API as string,
      SSL_VALIDATION_API: process.env.SSL_VALIDATION_API as string,
      SSL_SUCCESS_FRONTEND_URL: process.env.SSL_SUCCESS_FRONTEND_URL as string,
      SSL_FAIL_FRONTEND_URL: process.env.SSL_FAIL_FRONTEND_URL as string,
      SSL_CANCEL_FRONTEND_URL: process.env.SSL_CANCEL_FRONTEND_URL as string,
      SSL_SUCCESS_BACKEND_URL: process.env.SSL_SUCCESS_BACKEND_URL as string,
      SSL_FAIL_BACKEND_URL: process.env.SSL_FAIL_BACKEND_URL as string,
      SSL_CANCEL_BACKEND_URL: process.env.SSL_CANCEL_BACKEND_URL as string,
    },
    CLOUDINARY: {
      CLOUDINARY_CLOUDE_NAME: process.env.CLOUDINARY_CLOUDE_NAME as string,
      CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY as string,
      CLOUDINARY_API_SECRECT: process.env.CLOUDINARY_API_SECRECT as string
    }


  };
};

loadEnvVariables();

export const envVars: EnvVars = {
  PORT: process.env.PORT as string,
  DBURL: process.env.DBURL as string,
  NODE_ENV: process.env.NODE_ENV as "development" | "production",
  JWT_Secrect: process.env.JWT_Secrect as string,
  Super_Admin_email: process.env.Super_Admin_email as string,
  Super_Admin_password: process.env.Super_Admin_password as string,
  Bycrypt_Salt: Number(process.env.Bycrypt_Salt),
  JWT_REFRESH_SECRECT: process.env.JWT_REFRESH_SECRECT as string,
  JWT_REFRESH_TIME: process.env.JWT_REFRESH_TIME as string,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID as string,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET as string,
  FRONTEND_URL: process.env.FRONTEND_URL as string,
  GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL as string,
  EXPRESS_SESSION_SECRECT: process.env.EXPRESS_SESSION_SECRECT as string,

  SSL: {
    SSL_STORE_ID: process.env.SSL_STORE_ID as string,
    STORE_PASS: process.env.SSL_STORE_PASS as string,
    SSL_PAYMENT_API: process.env.SSL_PAYMENT_API as string,
    SSL_VALIDATION_API: process.env.SSL_VALIDATION_API as string,
    SSL_SUCCESS_FRONTEND_URL: process.env.SSL_SUCCESS_FRONTEND_URL as string,
    SSL_FAIL_FRONTEND_URL: process.env.SSL_FAIL_FRONTEND_URL as string,
    SSL_CANCEL_FRONTEND_URL: process.env.SSL_CANCEL_FRONTEND_URL as string,
    SSL_SUCCESS_BACKEND_URL: process.env.SSL_SUCCESS_BACKEND_URL as string,
    SSL_FAIL_BACKEND_URL: process.env.SSL_FAIL_BACKEND_URL as string,
    SSL_CANCEL_BACKEND_URL: process.env.SSL_CANCEL_BACKEND_URL as string,
  },
  CLOUDINARY: {
    CLOUDINARY_CLOUDE_NAME: process.env.CLOUDINARY_CLOUDE_NAME as string,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY as string,
    CLOUDINARY_API_SECRECT: process.env.CLOUDINARY_API_SECRECT as string
  }
};