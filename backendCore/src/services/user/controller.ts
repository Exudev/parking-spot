import { Request, Response, NextFunction } from "express";
import { User } from "../../types/types";
import userRepository from "./repository";
import { success, error } from "../../network/response";
import { AppError, ValidationError } from "../../utils/errors";

async function createUser(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const user: User = req.body;
    const newUser = await userRepository.createUser({type:'request', user:user});
    if (newUser) {
      success(req, res, "created", "user created successfully", 201);
    } else {
      next(new ValidationError("server-error", "Failed to create user"));
    }
  } catch (err) {
    console.error("Error creating user:", err);
    next(new AppError("error", "server-error", "server-error", err));
  }
}

async function login(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const auth = await userRepository.login({
      type: "request",
      password: password,
      username: email,
    });
    if (auth.type !== "response") {
      error(req, res, auth.errorCode, auth.errorMessage);
    }
    if (auth.type === "response") {
      res.cookie("access_token", auth.token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60,
        sameSite: "strict",
      });
      success(req, res, "created", "successfully login", 201);
    }
  } catch (err) {
    console.error("Error creating user:", err);
    error(req, res, "server-error", "server-error", 500);
  }
}
export { createUser, login };
