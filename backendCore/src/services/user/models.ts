import mongoose, { Schema, model, Document } from "mongoose";
import { VerificationCodeType } from "./types";
import { PermissionType } from "../../types/express";

// types

export type UserDBModel = {
  type: "user";
  email: string;
  username: string;
  name: string;
  lastname: string;
  active: boolean;
  password: string;
};
export type DriverDBModel = Omit<UserDBModel, "type"> & {
  type: "driver";
};

export type OrganizationUserDBModel = {
  type: "organization-user";
  organizationId: string;
  email: string;
  username: string;
  permissions: [PermissionType];
};

//Schemas
const OrganizationUserSchema = new Schema<OrganizationUserDBModel>(
  {
    type: {
      type: String,
      required: true,
      enum: ["organization-user"],
    },
    email: { type: String, required: true },
    username: { type: String, required: true },
    permissions: {
      type: [String],
      required: true,
      enum: ["admin", "moderator","viewer"],
      default: ["moderator"],
    },
    organizationId: { type: String, required: true },
  },
  { timestamps: true }
);

const UserSchema = new Schema<UserDBModel>(
  {
    type: {
      type: String,
      required: true,
      enum: ["user"],
      default: "user",
    },
    email: { type: String, required: true },
    username: { type: String, required: true },
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    active: { type: Boolean, required: true, default: false },
    password: { type: String, required: true },
  },
  { timestamps: true }
);
const DriverSchema = new Schema<DriverDBModel>(
  {
    type: {
      type: String,
      required: true,
      enum: ["driver"],
      default: "driver",
    },
    email: { type: String, required: true },
    username: { type: String, required: true },
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    active: { type: Boolean, required: true, default: false },
    password: { type: String, required: true },
  },
  { timestamps: true }
);
export interface IVerificationCode extends Document {
  userId: mongoose.Types.ObjectId;
  type: VerificationCodeType;
  expiresAt: Date;
  createdAt: Date;
}
const _VerificationCodeSchema = new Schema<IVerificationCode>(
  {
    userId: {
      type: Schema.ObjectId,
      ref: "UserId",
    },
    type: { type: String, required: true },
    expiresAt: { type: Date, required: true },
    createdAt: { type: Date, required: true },
  },
  { timestamps: true }
);
// Index
UserSchema.index(
  { type: 1, name: 1 },
  { collation: { locale: "en", strength: 3 } }
);
export const UserModel = model<UserDBModel>("User", UserSchema, "users");
export const OrganizationUserModel = model<OrganizationUserDBModel>(
  "OrganizationUser",
  OrganizationUserSchema,
  "users"
);
export const DriverModel = model<DriverDBModel>(
  "Driver",
  DriverSchema,
  "users"
);
export const UserCollection = UserModel.collection;
