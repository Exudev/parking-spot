import {
  BaseResponse,
  Driver,
  User,
  WithoutAuthRequest,
} from "../../types/types";
import { RepositoryError } from "../../utils/errors";

export const enum VerificationCodeType {
  EmailVerification = "email-verification",
  PasswordReset = "password-reset",
}

export type CreateUserRequest = WithoutAuthRequest & {
  user: User;
};

export type CreateDriverRequest = WithoutAuthRequest & {
  driver: Driver;
};

export type CreateUserResponse =
  | (BaseResponse & {
      username: string;
    })
  | RepositoryError;


export type ForgotPasswordRequest = WithoutAuthRequest & {
  email: string;
};

export type ForgotPasswordResponse =
  | (BaseResponse & {
      result: boolean;
    })
  | RepositoryError;


  export type reserveParkingSpotRequest = WithoutAuthRequest & {
  driver: Driver;
};

export type reserveParkingSpotResponse =
  | (BaseResponse & {
      username: string;
    })
  | RepositoryError;


export type LoginRequest = WithoutAuthRequest & {
  username: string;
  password: string;
};

export type LoginResponse =
  | (BaseResponse & {
      token: string;
    })
  | RepositoryError;

export type FindByEmailResponse =
  | (BaseResponse & {
      user: User;
    })
  | RepositoryError;
export type FindDriverByEmailResponse =
  | (BaseResponse & {
      driver: Driver;
    })
  | RepositoryError;
