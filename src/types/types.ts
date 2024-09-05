export type errorCode = "forbidden"| "exists"|"server-error"|"invalid-data";
export type responseCode = "created"| "updated"|"fetched"|"deleted";
export type userType = "user"| "admin"|"owner"|"moderator";
interface GeoJSONPoint {
    type: "Point";
    coordinates: [number, number]; // [longitude, latitude]
  }
  
export interface Organization {
    name: string;
    owner: string;
    location: GeoJSONPoint,
    locationDelta: GeoJSONPoint,
  }

  export interface User {
    username: string;
    email: string;
    name: string;
    lastName: string;
    userType: userType;  //change
    password: string;
  }

  export interface ParkingLot {
    name: string;
    organizationId: string;
    description: string;
    location: GeoJSONPoint,
  }
export type OrganizationLookup = Pick<Organization, 'name' |'location'>;
export type ParkingLookup = Pick<ParkingLot, 'name' |'location'>;
export type BaseResponse = {
  type: 'response'
}
// export type OrderStatus = 'pending' | 'shipped' | 'delivered';
  

  