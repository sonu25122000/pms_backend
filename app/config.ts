const dotenvResult = require("dotenv");
dotenvResult.config()

if (dotenvResult.error) {
  console.error("Error loading .env file:", dotenvResult.error);
}
// config.ts
export const SUPERUSER_JWT_SECRET = process.env.SUPERUSER_JWT_SECRET || 'default_secret_key';
export const USER_JWT_SECRET = process.env.USER_JWT_SECRET || 'default_secret_key';

