import { AccountOrganizationToken, PermissionType } from "../types/express";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { SECRET_KEY_JWT } from "../constants/env";

export const extractAccountFromToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    console.log("extractAccountFromToken: No token provided");
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, SECRET_KEY_JWT) as AccountOrganizationToken;
    console.log("extractAccountFromToken: decoded payload", decoded);

    req.account = decoded;
    next();
  } catch (error) {
    console.log("extractAccountFromToken: JWT verification failed", error);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export function checkPermissions(permissions: PermissionType[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    if (user && permissions.some((perm) => user.permissions?.includes(perm))) {
      return next();
    }
    return res.status(401).json({ message: "unauthorized" });
  };
}

export function isOrganizationUser() {
  return (req: Request, res: Response, next: NextFunction) => {
    console.log("hola", req.account)
    const user = req.account;
    if (user && user.userType === "user") {
      return next();
    } else {
      return res.status(401).json({ message: "unauthorized" });
    }
  };
}
