import { Schema, Model } from 'mongoose';

// Schema
const ParkingLotSchema = new Schema({
    organization: {type: Schema.ObjectId,
        ref: 'Organization', },
      name:  {type: String, require: true},
      totalParking:  {type: Number, require: true},
      description:  {type: String, require: true},
      latitude :{
          type: String,
          required: true,
        },
        longitude: {
          type:String ,
          required:true,
        },
});

const model = new Model('ParkingLotModel', ParkingLotSchema);
module.exports = model;
