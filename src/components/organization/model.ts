import { Schema, model, Document } from 'mongoose';

export interface IOrganization extends Document {
  name: string;
  location: {
    type: 'Point';
    coordinates: number[];
  };
  locationDelta: {
    type: 'Point';
    coordinates: number[];
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
});

const OrganizationModel = model<IOrganization>('Organization', OrganizationSchema);

export default OrganizationModel;
