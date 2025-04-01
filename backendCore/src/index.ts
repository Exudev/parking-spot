import express, { Application } from 'express';
import "dotenv/config";
import passport from 'passport';
import routes from './network/routes';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import connectDB from './config/mongo';
import { APP_ORIGIN, PORT, MAXRETRYATTEMPTS } from './constants/env';
import './utils/auth/index';
const app: Application = express();
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: APP_ORIGIN, credentials: true }));
app.use('/app', express.static('./public'));
app.use(cookieParser());
app.use(passport.initialize()); 


routes(app);

let retryAttempts = 0;
const maxRetryAttempts = Number.parseInt(MAXRETRYATTEMPTS);

function startServer(): void {
  app.listen(PORT, () => {
    console.log(`The application is listening on Localhost: ${PORT}`);
  }).on('error', (err: NodeJS.ErrnoException) => {
    if (err.code === 'EADDRINUSE') {
      if (retryAttempts < maxRetryAttempts) {
        retryAttempts++;
        console.log(`Port ${PORT} is in use. Retrying in 5 seconds... (Attempt ${retryAttempts} of ${maxRetryAttempts})`);
        setTimeout(() => {
          startServer();
        }, 5000);
      } else {
        console.error(`Port ${PORT} is still in use after ${maxRetryAttempts} attempts. Application shutting down.`);
        process.exit(1); 
      }
    } else {
      console.error('Error starting the server:', err);
    }
  });
}
startServer();
