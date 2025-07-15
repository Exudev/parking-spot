import { Request, Response, NextFunction } from "express";
import { Driver } from "../../types/types";
import userRepository from "./repository";
import { error, success } from "../../network/response";


async function createDriver(
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> {
  try {
    const driver: Driver = req.body.user;
    const result = await userRepository.createDriver({
      type: "request",
      driver: driver,
    });
    switch (result.type) {
      case "response":
        success(
          req,
          res,
          "created",
          `driver ${result.username} created successfully`
        );
        break;
      case "error":
        error(req, res, result.errorCode, result.errorMessage);
        break;
      default:
          throw new Error("Invalid Option");
    }
  } catch (err) {
    console.error("Error removing creating driver ", err);
  }
}

async function recoveryPassword(
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> {
  try {
    const driver: Driver = req.body.user;
    const result = await userRepository.createDriver({
      type: "request",
      driver: driver,
    });
    switch (result.type) {
      case "response":
        success(
          req,
          res,
          "created",
          `driver ${result.username} created successfully`
        );
        break;
      case "error":
        error(req, res, result.errorCode, result.errorMessage);
        break;
      default:
          throw new Error("Invalid Option");
    }
  } catch (err) {
    console.error("Error removing creating driver ", err);
  }
}
// async function login(
//   req: Request,
//   res: Response,
// ): Promise<void> {
//   try {
//     const email = req.body.email;
//     const password = req.body.password;
//     const auth = await userRepository.login({
//       type: "request",
//       password: password,
//       username: email,
//     });
//     if (auth.type !== "response") {
//       error(req, res, auth.errorCode, auth.errorMessage);
//     }
//     if (auth.type === "response") {
//       res.cookie("access_token", auth.token, {
//         httpOnly: true,
//         maxAge: 1000 * 60 * 60,
//         sameSite: "strict",
//       });
//       success(req, res, "created", "successfully login", 201);
//     }
//   } catch (err) {
//     console.error("Error creating user:", err);
//     error(req, res, "server-error", "server-error", 500);
//   }
// }
export {  createDriver };
