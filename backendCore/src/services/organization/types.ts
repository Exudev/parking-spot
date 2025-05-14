import {
  BaseRequest,
  WithoutAuthRequest,
  BaseResponse,
  Organization,
  OrganizationLookup,
  ParkingLot,
  User,
  Parking,
  GeoJSONPoint,
} from "../../types/types";
import { RepositoryError } from "../../utils/errors";

export type CreateOrganizationRequest = WithoutAuthRequest & {
  organization: Organization;
  user: User;
};

export type CreateOrganizationResponse =
  | (BaseResponse & {
      organizationId: string;
    })
  | RepositoryError;

export type DeleteOrganizationRequest = BaseRequest & {
  organizationId: string;
};
export type DeleteOrganizationResponse =
  | (BaseResponse & {
      success: boolean;
    })
  | RepositoryError;

export type GetOrganizationRequest = BaseRequest & {
  organizationId: string;
};
export type GetOrganizationResponse =
  | (BaseResponse & {
      organization: Organization;
    })
  | RepositoryError;

export type CheckOrganizationExistsRequest = WithoutAuthRequest & {
  organizationId: string;
};
export type CheckOrganizationExistsResponse =
  | (BaseResponse & {
      exists: boolean;
    })
  | RepositoryError;

export type GetNamesAndCoordinatesRequest = WithoutAuthRequest & {};
export type GetNamesAndCoordinatesResponse =
  | (BaseResponse & {
      organizations: OrganizationLookup[];
    })
  | RepositoryError;

export type GetAllOrganizationRequest = WithoutAuthRequest;
export type GetAllOrganizationResponse =
  | (BaseResponse & {
      organizations: Organization[];
    })
  | RepositoryError;

export type AddParkingLotRequest = BaseRequest & {
  name: string;
  description: string;
  location: GeoJSONPoint;
};
export type AddParkingLotResponse =
  | (BaseResponse & {
      success: boolean;
    })
  | RepositoryError;

export type RemoveParkingLotRequest = BaseRequest & {
  parkingLotId: string;
};

export type RemoveParkingLotResponse =
  | (BaseResponse & {
      success: boolean;
    })
  | RepositoryError;

export type GetParkingLotRequest = BaseRequest & {
  parkingLotId: string;
};

export type GetParkingLotResponse =
  | (BaseResponse & {
      parkingLot: ParkingLot;
    })
  | RepositoryError;

  export type GetParkingsByParkingLotRequest = BaseRequest & {
    parkingLotId: string;
  };
  
  export type GetParkingsByParkingLotResponse =
    | (BaseResponse & {
        parkings: Parking[];
      })
    | RepositoryError;

    
export type GetAllParkingLotRequest = BaseRequest;

export type GetAllParkingLotResponse =
  | (BaseResponse & {
      parkingLots: ParkingLot[];
    })
  | RepositoryError;

export type AddParkingRequest = BaseRequest & {
  parking: Parking;
};
export type AddParkingResponse =
  | (BaseResponse & {
      success: boolean;
    })
  | RepositoryError;

export type RemoveParkingRequest = BaseRequest & {
  organizationId: string;
  parkingId: string;
};
export type RemoveParkingResponse =
  | (BaseResponse & {
      success: boolean;
    })
  | RepositoryError;
