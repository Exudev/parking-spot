import { Request, Response , NextFunction} from 'express';
import { Organization } from '../../types/types';
import { success, error } from '../../network/response';
import { AppError, ValidationError } from '../../utils/errors';
import { json } from 'body-parser';
import { createOrganizationResponse } from './types';
const repository = require('./repository');

async function createOrganization(req: Request, res: Response, next: NextFunction): Promise<void> {
    
    try {
    const organization: Organization = req.body;
    const newOrganization = await repository.add(organization);
    if (newOrganization.type === "response") {
      success(req, res, "created" ,`organization created with id: ${JSON.stringify(newOrganization.organizationId)}`, 201);
    } else {
      console.log('por aqui')
      next(new ValidationError(newOrganization.errorCode, newOrganization.errorMessage ));
    }
  } catch (err) {
    console.error('Error creating organization:', err);
    next(new AppError(400, 'server-error', `Error creating organization` ,err));
  }
}

async function getOrganization(req: Request, res: Response): Promise<void> {
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

async function getAllOrganizations(req: Request, res: Response): Promise<void> {
  try {
    const organizations = await repository.getAll();
    success(req, res, organizations,'fetched', 200);
  } catch (err) {
    console.error('Error fetching organizations:', err);
    error(req, res, 'server-error', 'Internal server error', 500);
  }
}

async function deleteOrganization(req: Request, res: Response): Promise<void> {
  try {
    const organizationId: string = req.params.id;
    const result = await repository.delete(organizationId);
    if (result.deletedCount) {
      success(req, res,'deleted', 'Organization deleted successfully', 200);
    } else {
      error(req, res, 'invalid-data', 'Organization not found',404);
    }
  } catch (err) {
    console.error('Error deleting organization:', err);
    error(req, res, 'server-error', 'Internal server error',500);
  }
}

async function checkOrganizationExists(req: Request, res: Response): Promise<void> {
  try {
    const name: string = req.params.name;
    const exists = await repository.exists(name);
    if (exists) {
      success(req, res, 'fetched','Organization exists', 200);
    } else {
      error(req, res, 'invalid-data', 'Organization not found',400);
    }
  } catch (err) {
    console.error('Error checking organization existence:', err);
    error(req, res, 'server-error', 'Internal server error',500);
  }
}

async function getNamesandCoordinates(req: Request, res: Response): Promise<void> {
  try {
    const organizations = await repository.getAllCoordenates();
    success(req, res,'fetched', JSON.stringify(organizations), 200);
  } catch (err) {
    console.error('Error fetching organization names and coordinates:', err);
    error(req, res, 'server-error', 'Internal server error',500);
  }
}

export {
  createOrganization,
  getOrganization,
  getAllOrganizations,
  deleteOrganization,
  checkOrganizationExists,
  getNamesandCoordinates,
};
