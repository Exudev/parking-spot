import express from 'express';
import bodyParser from 'body-parser';
import "dotenv/config";
import { MONGO_URI, PORT } from './constants/env';
import connectDB from './config/mongo';
import router from './network/routes';
import errorMiddleware from './middlewares/errorMiddleware';
import cookieParser from 'cookie-parser';
connectDB();
const app = express();
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
router(app);
app.use(errorMiddleware);
app.use('/app', express.static('./public'));

let retryAttempts = 0;
const maxRetryAttempts = 7;

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
