import dotenv from 'dotenv';

dotenv.config();

interface Config {
  dev: boolean;
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
}

const config: Config = {
  dev: process.env.NODE_ENV !== 'production',
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
};

export { config };
