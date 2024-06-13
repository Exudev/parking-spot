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
  

// export type OrderStatus = 'pending' | 'shipped' | 'delivered';
  

  