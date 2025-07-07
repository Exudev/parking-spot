import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { SALT_ROUNDS, SECRET_KEY_JWT } from "../constants/env";
import { PermissionType } from "../types/express";
export function isValidObjectId(value: string): boolean {
  try {
    new ObjectId(value);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidPhoneNumber(phoneNumber: string): boolean {
  const phoneRegex = /^[0-9]+$/;
  return phoneRegex.test(phoneNumber);
}

export const hashValue = async (value: string): Promise<string> => {
  const saltRounds = Number.parseInt(SALT_ROUNDS, 10);
  const hashedValue = await bcrypt.hash(value, saltRounds);
  return hashedValue;
};

export const compareValue = async (
  value: string,
  hashedValue: string
): Promise<boolean> => {
  const valid = await bcrypt.compare(value, hashedValue).catch(() => false);
  return valid;
};

export function signToken(
  email: string,
  username: string,
  userType: "user" | "driver",
  permission: PermissionType[],
  organizationId: string
): string {
  const token = jwt.sign(
    {
      email: email,
      username: username,
      type: userType,
      permissions: permission,
      organizationId: organizationId,
    },
    SECRET_KEY_JWT,
    { expiresIn: "1h" }
  );

  return token;
}

interface TokenPayload {
  email: string;
  username: string;
  permissions: PermissionType[];
  organizationId: string;
  iat: number;
  exp: number;
}

export function verifyToken(token: string): TokenPayload {
  try {
    const decoded = jwt.verify(token, SECRET_KEY_JWT);
    if (
      typeof decoded !== "object" ||
      !decoded ||
      !("email" in decoded) ||
      !("username" in decoded) ||
      !("permissions" in decoded) ||
      !("organizationId" in decoded)
    ) {
      throw new Error("Token payload does not match expected structure");
    }

    return decoded as TokenPayload;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new Error("Token expired");
    } else if (error instanceof jwt.JsonWebTokenError) {
      throw new Error("Invalid token");
    } else {
      throw new Error(`Token verification failed: ${error}`);
    }
  }
}
