import express from "express";
import {
createUser,
deleteUser,
login,
} from './controller';
import {validateUser} from '../../middlewares/validatorMiddleware';

const userRouter = express.Router();
userRouter.post('/user',validateUser,createUser);
userRouter.delete('/user/:id',deleteUser);
userRouter.post('/login',login)
export default userRouter;