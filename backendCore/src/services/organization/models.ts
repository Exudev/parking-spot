import { Schema, model } from 'mongoose';

export type OrganizationDBModel = {
  type: "organization";
  organizationId: string;
  name: string;
  location: {
    type: 'Point';
    coordinates: [number, number];
  };
  locationDelta: {
    type: 'Point';
    coordinates: [number, number];
  };
  owner: string;
  createdAt: Date;
  updatedAt: Date;
};

export type ParkingLotDBModel = {
  type: "parking-lot";
  organizationId: string;
  name: string;
  description: string;
  location: {
    type: 'Point';
    coordinates: [number, number];
  };
  createdAt: Date;
  updatedAt: Date;
  hourlyRate: number;
};


export type ParkingDBModel = {
  type: "parking";
  parkingLot: Schema.Types.ObjectId;
  availability: boolean;
}
 
export type OrganizationData = OrganizationDBModel | ParkingLotDBModel | ParkingDBModel;

// Schemas 
const OrganizationSchema = new Schema<OrganizationDBModel>(
  {
    type: {
      type: String,
      required: true,
      enum: ["organization"],
    },
    organizationId: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    location: {
      type: {
        type: String,
        enum: ['Point'],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
        validate: {
          validator: (coords: number[]) => coords.length === 2,
          message: 'Coordinates must have exactly two numbers [longitude, latitude].',
        },
      },
    },
    locationDelta: {
      type: {
        type: String,
        enum: ['Point'],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
        validate: {
          validator: (coords: number[]) => coords.length === 2,
          message: 'Coordinates must have exactly two numbers [longitude, latitude].',
        },
      },
    },
    owner: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

const ParkingLotSchema = new Schema<ParkingLotDBModel>(
  {
    type: {
      type: String,
      required: true,
      enum: ["parking-lot"],
    },
    organizationId: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    location: {
      type: {
        type: String,
        enum: ['Point'],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
        validate: {
          validator: (coords: number[]) => coords.length === 2,
          message: 'Coordinates must have exactly two numbers [longitude, latitude].',
        },
      },
    },
    hourlyRate: { type: Number, required: true },
  },
  { timestamps: true }
);

const ParkingSchema = new Schema<ParkingDBModel>(
  {
    type: {
      type: String,
      required: true,
      enum: ["parking"],
    },
    parkingLot:{
      type: Schema.ObjectId,
      ref: 'ParkingLot', 
      required: true
  }, 
    availability: { type: Boolean, required: true, trim: true }
  },
  { timestamps: true }
);

// Index
OrganizationSchema.index(
  { type: 1, organizationId: 1, name: 1 },
  { collation: { locale: 'en', strength: 3 } }
);

ParkingLotSchema.index(
  { type: 1, organizationId: 1, name: 1 },
  { collation: { locale: 'en', strength: 3 } }
);
ParkingSchema.index(
  { type: 1, parkingLot: 1, name: 1 },
  { collation: { locale: 'en', strength: 3 } }
);

export const OrganizationModel = model('Organization', OrganizationSchema, 'organization');
export const ParkingLotModel = model('Organization', ParkingLotSchema, 'organization');
export const ParkingModel = model('Organization', ParkingSchema, 'organization');
export const OrganizationCollection = OrganizationModel.collection;