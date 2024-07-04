export type errorCode = "forbidden"| "exists"|"server-error"|"invalid-data";
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
  

  