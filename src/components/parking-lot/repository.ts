import { ObjectId } from 'mongodb';
import {ParkingLot} from '../../types/types'
import ParkingLotModel from "./models"
import { RepositoryError } from '../../utils/errors';



async function createParkingLot(parkingLot: ParkingLot): Promise<{wasCreated: true}| undefined> {
    try {
      const newOrganization = new ParkingLotModel(parkingLot);
      //checking if exists 
     const exists =  await ParkingLotModel.findOne({ name: {$eq :name} },{collation:'en', strength: 3});
  
     if(exists)
      {
        throw new RepositoryError('exists',409, "already-exists");
      }
  
      const created = await newOrganization.save();
      // Crear usuario para esa organizacion como owner y hacer el settings de una org. 
      if(created)
        {
          return {wasCreated: true};
        }
    } catch (error) {
      throw new RepositoryError('server-error',409, error);
    }
  }