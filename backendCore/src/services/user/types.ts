import { BaseRequest, BaseResponse, Organization, OrganizationLookup, User, UserSafe } from "../../types/types"
import { RepositoryError } from "../../utils/errors";

export const enum VerificationCodeType {
  EmailVerification = 'email_verification',
  PasswordReset = 'password-reset'
}

export type createUserRequest = BaseRequest & {
user:User,
};

export type createUserResponse = BaseResponse &{
  username: string;
}  | RepositoryError;

export type loginRequest = BaseRequest & {
username: string;
password: string;
};

export type loginResponse = BaseResponse &{
token: string;
  }  | RepositoryError;
  
  export type findByEmailResponse = BaseResponse &{
    user: User,
      }  | RepositoryError;
      