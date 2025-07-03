import express from "express";
import { createUser, createDriver } from "./controller";

import passport from "passport";
import jwt from "jsonwebtoken";
import { SECRET_KEY_JWT } from "../../constants/env";
import { loginRequestSchema, validateRequest } from "@src/middlewares/validatorMiddleware";
const userRouter = express.Router();

userRouter.post(
  "/login",
  validateRequest(loginRequestSchema),
  passport.authenticate("local", { session: false }),
  async (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({ error: "Unauthorized" });
      }
      let payload = req.user;
      console.log("usuario encontrado: ", req.user);
      const token = jwt.sign(payload, SECRET_KEY_JWT, { expiresIn: "1h" });
      return res.json({ token });
    } catch (error) {
      next(error);
    }
  }
);
userRouter.post("/user", createUser);

// driver
userRouter.post("/driver",createDriver);


export default userRouter;
 