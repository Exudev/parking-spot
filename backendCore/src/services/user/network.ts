import express from "express";
import {
createUser,
deleteUser,
login,
} from './controller';

import passport = require("passport");

const userRouter = express.Router();
userRouter.post('/login',
    passport.authenticate('local', {session: false}),
    async (req,res,next) => {
        try {
            res.json(req.user)
        } catch (error) {
            next(error)
        }
    }
)
userRouter.post('/user',createUser);
userRouter.delete('/user/:id',deleteUser);
export default userRouter;