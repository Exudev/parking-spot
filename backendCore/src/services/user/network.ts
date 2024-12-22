import express from "express";
import {
createUser,
deleteUser,
login,
} from './controller';

const userRouter = express.Router();
userRouter.post('/user',createUser);
userRouter.delete('/user/:id',deleteUser);
userRouter.post('/login',login)
export default userRouter;