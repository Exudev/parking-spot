import { Schema, Model } from 'mongoose';

// Schema  
const OrganizationSchema = new Schema({
    name: { type: String, required: true },
    location: {
      type: { type: String, enum: ["Point"], required: true },
      coordinates: { type: [Number], required: true }
    },
    locationDelta: {
      type: { type: String, enum: ["Point"], required: true },
      coordinates: { type: [Number], required: true }
    },
    owner: { type: String, required: true },
});

const model = new Model('OrganizationModel', OrganizationSchema);
module.exports = model;
