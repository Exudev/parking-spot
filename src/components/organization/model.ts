import { Schema, Model } from 'mongoose';


// Schema
const OrganizationSchema = new Schema({
    organizationName: { type: String, required: true },
    latitude :{
      type: String,
      required: true,
    },
    longitude: {
      type:String ,
      required:true,
    },
    latitudeDelta:{
      type:String ,
      required:true,
    },
    longitudeDelta:{
      type:String ,
      required:true,
    },
    organizationOwner: { type: String, required: true },
});


const model = new Model('OrganizationModel', OrganizationSchema);
module.exports = model;
