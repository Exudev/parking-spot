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

// async function recoveryPassword(
//   req: Request,
//   res: Response,
//   _next: NextFunction
// ): Promise<void> {
//   try {
//     const driver: Driver = req.body.user;
//     const result = await userRepository.createDriver({
//       type: "request",
//       driver: driver,
//     });
//     switch (result.type) {
//       case "response":
//         success(
//           req,
//           res,
//           "created",
//           `driver ${result.username} created successfully`
//         );
//         break;
//       case "error":
//         error(req, res, result.errorCode, result.errorMessage);
//         break;
//       default:
//           throw new Error("Invalid Option");
//     }
//   } catch (err) {
//     console.error("Error removing creating driver ", err);
//   }
// }
export {  createDriver };
