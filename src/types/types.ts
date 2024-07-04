export type errorCode = "forbidden"| "exists"|"server-error"|"invalid-data";
export type responseCode = "created"| "updated"|"fetched"|"deleted";

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

export type OrganizationLookup = Pick<Organization, 'name' |'location'>;

  

// export type OrderStatus = 'pending' | 'shipped' | 'delivered';
  

  