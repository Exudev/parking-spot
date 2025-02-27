import { AccountOrganizationToken } from "../types/express";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { SECRET_KEY_JWT } from "../constants/env";


export const extractAccountFromToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];
  console.log("hi ", token);
  try {
    const decoded = jwt.verify(
      token,
      SECRET_KEY_JWT
    ) as AccountOrganizationToken;
    console.log(decoded);
    req.account = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token 1" });
  }
};
