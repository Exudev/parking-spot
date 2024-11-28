import { Schema, model, Document } from 'mongoose';

// Definición de la interfaz con un campo adicional `type`
export interface IOrganization extends Document {
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
}

const OrganizationSchema = new Schema<IOrganization>(
  {
    type: { 
      type: String, 
      required: true, 
      enum: ["organization"], 
      default: "organization" 
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

OrganizationSchema.index({type:1,organizationId:1,  name: 1 }, { collation: { locale: 'en', strength: 3 } });
 

export const OrganizationModel = model<IOrganization>('Organization', OrganizationSchema);
export const OrganizationCollection = OrganizationModel.collection;

