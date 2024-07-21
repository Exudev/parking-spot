import { Schema, model, Document, ObjectId} from 'mongoose';

export interface IParkingLot extends Document {
  name: string;
  organizationId: ObjectId;
  description: string;
  location: {
    type: 'Point';
    coordinates: [number, number];
  };
  locationDelta: {
    type: 'Point';
    coordinates: [number, number];
  };
}
// Schema

const ParkingLotSchema = new Schema<IParkingLot>(
  {
    organizationId: {type: Schema.ObjectId,
        ref: 'Organization', },
      name:  {type: String, require: true},
      description:  {type: String, require: true},
      location: {
        type: { type: String, enum: ['Point'], required: true },
        coordinates: { type: [Number], required: true },
      },
      locationDelta: {
        type: { type: String, enum: ['Point'], required: true },
        coordinates: { type: [Number], required: true },
      },
});

const ParkingLotModel = model<IParkingLot>('ParkingLot', ParkingLotSchema);
ParkingLotSchema.index({ name: 1 }, { collation: { locale: 'en', strength: 3 } });
export default ParkingLotModel;