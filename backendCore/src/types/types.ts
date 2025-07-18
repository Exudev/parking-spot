import { AccountOrganizationToken, PermissionType } from "./express";

export type ErrorCode =
  | "forbidden"
  | "unauthorized"
  | "exists"
  | "server-error"
  | "invalid-data"
  | "not-found";
export type ResponseCode = "created" | "updated" | "fetched" | "deleted";
export type OrganizationPlan= "basic"|"normal"|"premium";
export interface GeoJSONPoint {
  type: "Point";
  coordinates: [number, number];
}

interface OrganizationSettings {
  owner : string;
  plan:OrganizationPlan ;
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
  userType:"user";
  username: string; 
  organizationId:string;
  email: string;
  name: string;
  lastname: string;
  permissions: [PermissionType];
  password: string;
}
export type Driver = Omit<User,"userType"| "organizationId"> & {
  userType: "driver";
};

export type EmptyObject = Record<string, never>;

export interface OrganizationUser {
  username: string;
  organizationId: string;
  permissions: PermissionType;
}

export interface PublicProfile {
  username: string; 
  email: string;
  name: string;
  lastname: string;
}

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
export type BaseDriverRequest = {
  type: "request";
  account: AccountOrganizationToken;
};

