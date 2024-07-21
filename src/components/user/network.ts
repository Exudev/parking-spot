import express from "express";
import {
createUser,
deleteUser,
} from './controller';
import {validateUser} from '../../middlewares/validatorMiddleware';

const userRouter = express.Router();
userRouter.post('/user',validateUser,createUser);
userRouter.delete('/user/:id',deleteUser);
