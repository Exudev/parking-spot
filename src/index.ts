import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { config } from './config/index';
import connectDB from './db/mongo';
import router from './network/routes';
import errorMiddleware from './middlewares/errorMiddleware';

dotenv.config();
if (!config.dbUser || !config.dbPassword|| !config.dbHost) {
  throw new Error('Database user or password is not defined');
}
const username = encodeURIComponent(config.dbUser);
const password = encodeURIComponent(config.dbPassword);
const MONGO_URI =`mongodb+srv://${username}:${password}@${config.dbHost}`;
connectDB(MONGO_URI);
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
router(app);
app.use(errorMiddleware);
app.use('/app', express.static('./public'));

let retryAttempts = 0;
const maxRetryAttempts = 7;

function startServer(): void {
  app.listen(config.port, () => {
    console.log(`The application is listening on Localhost: ${config.port}`);
  }).on('error', (err: NodeJS.ErrnoException) => {
    if (err.code === 'EADDRINUSE') {
      if (retryAttempts < maxRetryAttempts) {
        retryAttempts++;
        console.log(`Port ${config.port} is in use. Retrying in 5 seconds... (Attempt ${retryAttempts} of ${maxRetryAttempts})`);
        setTimeout(() => {
          startServer();
        }, 5000);
      } else {
        console.error(`Port ${config.port} is still in use after ${maxRetryAttempts} attempts. Application shutting down.`);
        process.exit(1); 
      }
    } else {
      console.error('Error starting the server:', err);
    }
  });
}
startServer();
