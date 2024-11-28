import { BaseRequest, BaseResponse, Organization, OrganizationLookup, User } from "../../types/types"
import { RepositoryError } from "../../utils/errors";

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
  
