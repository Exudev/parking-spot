import express from 'express';
import {
  createOrganization,
  getOrganization,
  getAllOrganizations,
  deleteOrganization,
  checkOrganizationExists,
  getNamesandCoordinates,
} from './controller';

const organizationRouter = express.Router();

organizationRouter.post('/organization', createOrganization);
organizationRouter.get('/organization/:id', getOrganization);
organizationRouter.get('/organization', getAllOrganizations);
organizationRouter.delete('/organization/:id', deleteOrganization);
organizationRouter.get('/organization/exists/:email', checkOrganizationExists);
organizationRouter.get('/organization/names-coordinates', getNamesandCoordinates);

export default organizationRouter;
