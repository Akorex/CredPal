import * as dotenv from "dotenv";

dotenv.config();

export const DATABASE_URL = process.env.DATABASE_URL as string;
export const PORT = process.env.PORT;
export const NODE_ENV = process.env.NODE_ENV;
export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET as string;
