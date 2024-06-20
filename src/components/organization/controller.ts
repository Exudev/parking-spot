import { Request, Response } from 'express';
import { Organization } from '../../types/types';
import { success, error } from '../../network/response';
const repository = require('./repository');

async function createOrganization(req: Request, res: Response): Promise<void> {
    
    try {
    const organization: Organization = req.body;
    const newOrganization = await repository.add(organization);
    if (newOrganization) {
      success(req, res, 'Organization created successfully', 201);
    } else {
      error(req, res, 'invalid-data', 400, 'Failed to create organization');
    }
  } catch (err) {
    console.error('Error creating organization:', err);
    error(req, res, 'server-error', 500, 'Internal server error');
  }
}

async function getOrganization(req: Request, res: Response): Promise<void> {
  try {
    const organizationId: string = req.params.id;
    const organization = await repository.getOne(organizationId);
    if (organization) {
      success(req, res, JSON.stringify(organization), 200);
    } else {
      error(req, res, 'invalid-data', 404, 'Organization not found');
    }
  } catch (err) {
    console.error('Error fetching organization:', err);
    error(req, res, 'server-error', 500, 'Internal server error');
  }
}

async function getAllOrganizations(req: Request, res: Response): Promise<void> {
  try {
    const organizations = await repository.getAll();
    success(req, res, JSON.stringify(organizations), 200);
  } catch (err) {
    console.error('Error fetching organizations:', err);
    error(req, res, 'server-error', 500, 'Internal server error');
  }
}

async function deleteOrganization(req: Request, res: Response): Promise<void> {
  try {
    const organizationId: string = req.params.id;
    const result = await repository.delete(organizationId);
    if (result.deletedCount) {
      success(req, res, 'Organization deleted successfully', 200);
    } else {
      error(req, res, 'invalid-data', 404, 'Organization not found');
    }
  } catch (err) {
    console.error('Error deleting organization:', err);
    error(req, res, 'server-error', 500, 'Internal server error');
  }
}

async function checkOrganizationExists(req: Request, res: Response): Promise<void> {
  try {
    const email: string = req.params.email;
    const exists = await repository.exists(email);
    if (exists) {
      success(req, res, 'Organization exists', 200);
    } else {
      error(req, res, 'invalid-data', 404, 'Organization not found');
    }
  } catch (err) {
    console.error('Error checking organization existence:', err);
    error(req, res, 'server-error', 500, 'Internal server error');
  }
}

async function getNamesandCoordinates(req: Request, res: Response): Promise<void> {
  try {
    const organizations = await repository.getAllCoordenates();
    success(req, res, JSON.stringify(organizations), 200);
  } catch (err) {
    console.error('Error fetching organization names and coordinates:', err);
    error(req, res, 'server-error', 500, 'Internal server error');
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
