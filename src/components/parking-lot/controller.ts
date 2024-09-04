import {Request,Response, NextFunction} from 'express';
import {ParkingLot} from '../../types/types'
import {error, success} from '../../network/response';
import { AppError, ValidationError } from '../../utils/errors';
const repository = require('./repository');


async function createParkingLot(req: Request, res: Response, next: NextFunction): Promise<void> {
    
    try {
    const parkingLot: ParkingLot = req.body;
    const newParkingLot = await repository.add(parkingLot);
    if (newParkingLot) {
      success(req, res, "created" ,`created parking Lot for organization ${parkingLot.organizationId}`, 201);
    } else {
      next(new ValidationError('Failed to create parking Lot','server-error'));
    }
  } catch (err) {
    console.error('Error creating parking lot:', err);
    next(new AppError(400,'server-error' ,'Failed to create parking Lot',err));
  }
}


async function getParkingLot(req: Request, res: Response): Promise<void> {
    try {
      const organizationId: string = req.params.id;
      const organization = await repository.getOne(organizationId);
      if (organization) {
        success(req, res,"fetched",JSON.stringify(organization), 200);
      } else {
        error(req, res, 'invalid-data', 'Organization not found',404);
      }
    } catch (err) {
      console.error('Error fetching organization:', err);
      error(req, res, 'server-error', 'Internal server error', 500);
    }
  }
  
  
  
  export {
    createParkingLot,
    getParkingLot,
  };
  