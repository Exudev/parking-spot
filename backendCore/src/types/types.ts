export type errorCode =
  | "forbidden"
  | "exists"
  | "server-error"
  | "invalid-data"
  | "not-found";
export type responseCode = "created" | "updated" | "fetched" | "deleted";
export type userType = "user" | "admin" | "owner" | "moderator";
interface GeoJSONPoint {
  type: "Point";
  coordinates: [number, number];
}

interface OrganizationSettings {
  owner : string;
}

export interface Organization {
  organizationId : string;
  name: string;
  location: GeoJSONPoint;
  locationDelta: GeoJSONPoint;
  settings : OrganizationSettings; 
}

export interface User {
  username: string; 
  email: string;
  name: string;
  lastname: string;
  userType: userType; //change
  password: string;
}

export interface ParkingLot {
  name: string;
  organizationId: string;
  description: string;
  location: GeoJSONPoint;
}
export type OrganizationLookup = Pick<Organization, "name" | "location"| "locationDelta">;
export type ParkingLookup = Pick<ParkingLot, "name" | "location">;
export type ResponseType = "response"  | "info"  | "error";
export type BaseResponse = {
  type: "response";
};
export type BaseRequest = {
  type: "request";
  // this needs auth
};

