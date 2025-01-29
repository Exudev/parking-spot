import express from "express";
import {
createUser,
deleteUser,
login,
} from './controller';

import passport = require("passport");

const userRouter = express.Router();
userRouter.post('/login',
   login
)
userRouter.post('/user',createUser);
userRouter.delete('/user/:id',deleteUser);
export default userRouter;

// passport.authenticate('jwt',{session:false})