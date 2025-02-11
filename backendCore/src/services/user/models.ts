import mongoose, { Schema, model, Document } from "mongoose";
import { permissionType } from "../../types/types";
import { VerificationCodeType } from "./types";

export interface IUser extends Document {
  type: "user";
  email: string;
  organizationId:string,
  username: string;
  name: string;
  lastname: string;
  permission: permissionType;
  active: boolean;
  password: string;
  comparePassword(pass: string): Promise<boolean>;
}
const UserSchema = new Schema<IUser>(
  {
    type: {
      type: String,
      required: true,
      enum: ["user"],
      default: "user",
    },
    email: { type: String, unique: true, required: true },
    username: { type: String, required: true },
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    permission:{
      type: String,
      required: true,
      enum: ["admin", "moderator","genin"],
      default: "moderator",
    },
    organizationId:{ type: String, required: true },
    active: { type: Boolean, required: true, default: false },
    password: { type: String, required: true },
  },
  { timestamps: true }
);
UserSchema.index(
  { type: 1, name: 1 },
  { collation: { locale: "en", strength: 3 } }
);
export interface IVerificationCode extends Document {
  userId: mongoose.Types.ObjectId;
  type: VerificationCodeType;
  expiresAt: Date;
  createdAt: Date;
}
const VerificationCodeSchema = new Schema<IVerificationCode>(
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
export const UserModel = model<IUser>("User", UserSchema);
export const UserCollection = UserModel.collection;
