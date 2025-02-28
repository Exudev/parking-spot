import express from "express";
import { createUser } from "./controller";

import passport = require("passport");
import jwt from "jsonwebtoken";
import { SECRET_KEY_JWT } from "../../constants/env";
const userRouter = express.Router();

userRouter.post(
  "/login",
  passport.authenticate("local", { session: false }),

  async (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({ error: "Unauthorized" });
      }
      let payload = req.user;
      console.log(req.user);
      const token = jwt.sign(payload, SECRET_KEY_JWT, { expiresIn: "1h" });
      return res.json({ token });
    } catch (error) {
      next(error);
    }
  }
);
userRouter.post("/user", createUser);
export default userRouter;
