import { BaseRequest, BaseResponse, Organization, OrganizationLookup, User } from "../../types/types"
import { RepositoryError } from "../../utils/errors";

export type createOrganizationRequest = BaseRequest & {
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

export type checkOrganizationExistsRequest = BaseRequest & {
  organizationId: string;
}
export type checkOrganizationExistsResponse =  BaseResponse &{
exists: boolean;
} | RepositoryError;

export type getNamesandCoordenatesRequest = BaseRequest & {
  organizationId: string;
}
export type getNamesandCoordenatesResponse =  BaseResponse &{
organizations:OrganizationLookup[];        //array
} | RepositoryError;

export type getAllOrganizationRequest = BaseRequest & {
  organizationId: string;
}
export type getAllOrganizationResponse =  BaseResponse &{
organizations:Organization[];
} | RepositoryError;

export type addParkingLotRequest = BaseRequest & {
  organizationId: string;
}
export type gaddParkingLotResponse =  BaseResponse &{

} | RepositoryError;

