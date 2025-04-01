import { AccountOrganizationToken } from "./express";

export type errorCode =
  | "forbidden"
  | "unauthorized"
  | "exists"
  | "server-error"
  | "invalid-data"
  | "not-found";
export type responseCode = "created" | "updated" | "fetched" | "deleted";
export type permissionType = "admin"|"moderator";
export type organizationPlan= "basic"|"normal"|"premium";
export interface GeoJSONPoint {
  type: "Point";
  coordinates: [number, number];
}

interface OrganizationSettings {
  owner : string;
  plan:organizationPlan ;
  active: boolean;
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
  organizationId:string;
  email: string;
  name: string;
  lastname: string;
  permissions: permissionType;
  password: string;
  role:string,
}

export interface publicProfile {
  username: string; 
  email: string;
  name: string;
  lastname: string;
}


export type UserSafe = Omit<User, "password">

export interface ParkingLot {
  name: string;
  organizationId: string;
  description: string;
  location: GeoJSONPoint;
}

export interface Parking {
  parkingLotId: string;
  name: string;
  basePrice: number;
}
export type OrganizationLookup = Pick<Organization, "name" | "location"| "locationDelta">;
export type ParkingLookup = Pick<ParkingLot, "name" | "location">;
export type ResponseType = "response"  | "info"  | "error";
export type WithoutAuthRequest = {
type: "request";

};  
export type BaseResponse = {
  type: "response";
};
export type BaseRequest = {
  type: "request";
  account: AccountOrganizationToken;
};

