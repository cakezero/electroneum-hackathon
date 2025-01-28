import * as dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 5000;

const DB_URI = process.env.DB_URI;

const ENVIRONMENT = process.env.NODE_ENV || "development";

const JWT_SECRET = process.env.JWT_SECRET || "secret";

export { PORT, DB_URI, ENVIRONMENT, JWT_SECRET };