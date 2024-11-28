import dotenv from 'dotenv';

dotenv.config();

interface Config {
  port: string | number;
  cors: string | undefined;
  dbUser: string | undefined;
  dbPassword: string | undefined;
  dbHost: string | undefined;
  dbName: string | undefined;
  dbPort: string | undefined;
  emailSender: string | undefined;
  passEmailSender: string | undefined;
  serviceEmailSender: string | undefined;
  secretKey: string;
 // saltRounds: number | undefined;
}

const config: Config = {
  port: process.env.PORT || 3000,
  cors: process.env.CORS,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  dbPort: process.env.PORT,
  emailSender: process.env.EMAIL_SENDER,
  passEmailSender: process.env.PASS_EMAIL_SENDER,
  serviceEmailSender: process.env.SERVICE_EMAIL_SENDER,
  secretKey:process.env.SECRET_KEY || "", 
 // saltRounds: process.env.SALT_ROUNDS || 10,
};

export { config };
