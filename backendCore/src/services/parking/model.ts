import { Schema, Model } from 'mongoose';

// Schema
const ParkingSchema = new Schema({
    parkingLot:{
        type: Schema.ObjectId,
        ref: 'ParkingLot', 
    }, 
    parking: {type: String, require: true},
    availability: {type: String, require: true},
});

const model = new Model('ParkingModel', ParkingSchema);
module.exports = model;
