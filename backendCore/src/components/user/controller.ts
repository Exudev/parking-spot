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
    const newUser = await userRepository.createUser(user);
    if (newUser) {
      success(req, res, "created", "user created successfully", 201);
    } else {
      next(new ValidationError("server-error", "Failed to create user"));
    }
  } catch (err) {
    console.error("Error creating user:", err);
    next(new AppError("error", 400, "server-error", "server-error", err));
  }
}

async function deleteUser(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {}

async function login(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const username = req.body.username;
    const password = req.body.password;
    const loginN = await userRepository.login({
      type: "request",
      password: password,
      username: username,
    });
    if (loginN.type !== "response") {
      next(new AppError("error", 400, loginN.errorCode, loginN.errorMessage));
    }
    if (loginN.type === "response") {
      res.cookie("access_token", loginN.token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60,
        sameSite: "strict",
      });
      success(req, res, "created", "successfully login", 201);
    } else {
      next(new ValidationError("server-error", "Failed to login user"));
    }
  } catch (err) {
    console.error("Error creating user:", err);
    next(new AppError("error", 400, "server-error", "server-error", err));
  }
}
export { createUser, deleteUser, login };
