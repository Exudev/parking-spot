import { ObjectId } from 'mongodb';
import {ParkingLot} from '../../types/types'
import ParkingLotModel from "./models"
import { RepositoryError } from '../../utils/errors';


async function createParkingLot(parkingLot: ParkingLot): Promise<{wasCreated: true}| undefined> {
    try {
      const newParkingLot = new ParkingLotModel(parkingLot);
      //checking if exists 
     const exists =  await ParkingLotModel.findOne({ name: {$eq :name} },{collation:'en', strength: 3});
  
     if(exists)
      {
        throw new RepositoryError('exists', "already-exists",409);
      }
  
      const created = await newParkingLot.save();
      // Crear usuario para esa organizacion como owner y hacer el settings de una org. 
      if(created)
        {
          return {wasCreated: true};
        }
    } catch (error) {
      throw new RepositoryError('server-error',"", 409,error);
    }
}

async function deleteParkingLot(id: string): Promise<{ deletedCount?: number }> {
  try {
    const result = await ParkingLotModel.deleteOne({ _id: id });
    return result;
  } catch (error) {
    console.error('Error occurred during deleting parkingLot:', error);
    throw error;
  }
}

async function getParkingLot(parkingLotId: string): Promise<ParkingLot | undefined> {
  try {
    const objectId = new ObjectId(parkingLotId);
    const parkingLot = await ParkingLotModel.findById(objectId).exec();
    if(parkingLot)
      {
        return {
          name: parkingLot.name,
          description: parkingLot.description,
          location: parkingLot.location,
          organizationId: parkingLot.organizationId.transform.toString(),
        };
      }
    else return undefined;
  } catch (error) {
    console.error('Error occurred during searching organization:', error);
    throw error;
  }
}
