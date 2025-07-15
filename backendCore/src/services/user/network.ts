import express from "express";
import { createDriver } from "./controller";

import passport from "passport";
import jwt from "jsonwebtoken";
import { SECRET_KEY_JWT } from "../../constants/env";
import { createDriverRequestSchema, loginRequestSchema, recoveryRequestSchema, validateRequest } from "@src/middlewares/request-schemas";
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
      const token = jwt.sign(payload, SECRET_KEY_JWT, { expiresIn: "1h" });
      return res.json({ token });
    } catch (error) {
      next(error);
    }
  }
);


// driver
userRouter.post("/driver",validateRequest(createDriverRequestSchema),createDriver);

userRouter.post("/recovery-driver",validateRequest(recoveryRequestSchema),);

export default userRouter;
 