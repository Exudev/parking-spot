import { BaseRequest, WithoutAuthRequest,BaseResponse, Organization, OrganizationLookup, ParkingLot, User } from "../../types/types"
import { RepositoryError } from "../../utils/errors";

export type createOrganizationRequest = WithoutAuthRequest & {
organization : Organization,
user:User,
};

export type createOrganizationResponse = BaseResponse &{
  organizationId: string;
}  | RepositoryError;

export type deleteOrganizationRequest = BaseRequest & {
  organizationId: string;
}
export type deleteOrganizationResponse =  BaseResponse &{
success: boolean;
} | RepositoryError;

export type getOrganizationRequest = BaseRequest & {
  organizationId: string;
}
export type getOrganizationResponse =  BaseResponse &{
organization: Organization;
} | RepositoryError;

export type checkOrganizationExistsRequest = WithoutAuthRequest & {
  organizationId: string;
}
export type checkOrganizationExistsResponse =  BaseResponse &{
exists: boolean;
} | RepositoryError;

export type getNamesandCoordenatesRequest = WithoutAuthRequest & {
}
export type getNamesandCoordenatesResponse =  BaseResponse &{
organizations:OrganizationLookup[];
} | RepositoryError;

export type getAllOrganizationRequest = WithoutAuthRequest 
export type getAllOrganizationResponse =  BaseResponse &{
organizations:Organization[];
} | RepositoryError;

export type addParkingLotRequest = BaseRequest & {
  organizationId: string;
  parkingLot:ParkingLot;
}
export type addParkingLotResponse =  BaseResponse &{
  success: boolean;
} | RepositoryError;

