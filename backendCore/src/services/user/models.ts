import mongoose, { Schema, model, Document } from "mongoose";
import { userType } from "../../types/types";
import { VerificationCodeType } from "./types";

export interface IUser extends Document {
  type: "user";
  email: string;
  username: string;
  name: string;
  lastName: string;
  userType: userType;
  password: string;
}
const UserSchema = new Schema<IUser>(
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
    lastName: { type: String, required: true },
    userType: { type: String, required: true },
    password: { type: String, required: true }
  },
  { timestamps: true }
);
UserSchema.index(
  { type: 1, name: 1 },
  { collation: { locale: "en", strength: 3 } }
);
export interface IVerificationCode  extends Document {
  userId: mongoose.Types.ObjectId
  type: VerificationCodeType;
  expiresAt:Date;
  createdAt:Date;
}
const VerificationCodeSchema = new Schema<IVerificationCode>(
  {
    userId: {
      type: Schema.ObjectId,
ref: 'UserId',

    },
    type: { type: String, required: true },
    expiresAt: { type: Date, required: true },
    createdAt: { type: Date, required: true }
  },
  { timestamps: true }
);
export const UserModel = model<IUser>("User", UserSchema);
export const UserCollection = UserModel.collection;
                                                                                                       
