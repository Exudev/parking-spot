import { Schema, model, Document } from 'mongoose';
import { OrganizationLookup } from '../../types/types';
export interface IOrganization extends Document {
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
}

const OrganizationSchema = new Schema<IOrganization>({
  name: { type: String, required: true },
  location: {
    type: { type: String, enum: ['Point'], required: true },
    coordinates: { type: [Number], required: true },
  },
  locationDelta: {
    type: { type: String, enum: ['Point'], required: true },
    coordinates: { type: [Number], required: true },
  },
  owner: { type: String, required: true },
},{ timestamps: true });

const OrganizationModel = model<IOrganization>('Organization', OrganizationSchema);
OrganizationSchema.index({ name: 1 }, { collation: { locale: 'en', strength: 3 } });
export default OrganizationModel;
