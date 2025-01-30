import * as dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 5000;

const DB_URI = process.env.DB_URI;

const ENVIRONMENT = process.env.NODE_ENV || "development";

const JWT_SECRET = process.env.JWT_SECRET || "secret";

const EMAIL_SERVICE = process.env.EMAIL_SERVICE;

const EMAIL_USER = process.env.EMAIL_USER;

const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;

export { PORT, DB_URI, ENVIRONMENT, JWT_SECRET, EMAIL_PASSWORD, EMAIL_USER, EMAIL_SERVICE };