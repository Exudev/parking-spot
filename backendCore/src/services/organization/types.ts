import {
  BaseRequest,
  WithoutAuthRequest,
  BaseResponse,
  Organization,
  OrganizationLookup,
  ParkingLot,
  User,
  Parking,
} from "../../types/types";
import { RepositoryError } from "../../utils/errors";

export type createOrganizationRequest = WithoutAuthRequest & {
  organization: Organization;
  user: User;
};

export type createOrganizationResponse =
  | (BaseResponse & {
      organizationId: string;
    })
  | RepositoryError;

export type deleteOrganizationRequest = BaseRequest & {
  organizationId: string;
};
export type deleteOrganizationResponse =
  | (BaseResponse & {
      success: boolean;
    })
  | RepositoryError;

export type getOrganizationRequest = BaseRequest & {
  organizationId: string;
};
export type getOrganizationResponse =
  | (BaseResponse & {
      organization: Organization;
    })
  | RepositoryError;

export type checkOrganizationExistsRequest = WithoutAuthRequest & {
  organizationId: string;
};
export type checkOrganizationExistsResponse =
  | (BaseResponse & {
      exists: boolean;
    })
  | RepositoryError;

export type getNamesAndCoordinatesRequest = WithoutAuthRequest & {};
export type getNamesAndCoordinatesResponse =
  | (BaseResponse & {
      organizations: OrganizationLookup[];
    })
  | RepositoryError;

export type getAllOrganizationRequest = WithoutAuthRequest;
export type getAllOrganizationResponse =
  | (BaseResponse & {
      organizations: Organization[];
    })
  | RepositoryError;

export type addParkingLotRequest = BaseRequest & {
  parkingLot: ParkingLot;
};
export type addParkingLotResponse =
  | (BaseResponse & {
      success: boolean;
    })
  | RepositoryError;

export type removeParkingLotRequest = BaseRequest & {
  parkingLotId: string;
};

export type removeParkingLotResponse =
  | (BaseResponse & {
      success: boolean;
    })
  | RepositoryError;

export type getParkingLotRequest = BaseRequest & {
  parkingLotId: string;
};

export type getParkingLotResponse =
  | (BaseResponse & {
      parkingLot: ParkingLot;
    })
  | RepositoryError;

  export type getParkingsByParkingLotRequest = BaseRequest & {
    parkingLotId: string;
  };
  
  export type getParkingsByParkingLotResponse =
    | (BaseResponse & {
        parkings: Parking[];
      })
    | RepositoryError;

    
export type getAllParkingLotRequest = BaseRequest;

export type getAllParkingLotResponse =
  | (BaseResponse & {
      parkingLots: ParkingLot[];
    })
  | RepositoryError;

export type addParkingRequest = BaseRequest & {
  parking: Parking;
};
export type addParkingResponse =
  | (BaseResponse & {
      success: boolean;
    })
  | RepositoryError;

export type removeParkingRequest = BaseRequest & {
  organizationId: string;
  parkingId: string;
};
export type removeParkingResponse =
  | (BaseResponse & {
      success: boolean;
    })
  | RepositoryError;
