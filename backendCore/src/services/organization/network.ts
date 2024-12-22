import express from 'express';
import {
  createOrganization,
  getOrganization,
  getAllOrganizations,
  deleteOrganization,
  checkOrganizationExists,
  getNamesandCoordinates,
} from './controller';
import {createOrganizationRequestSchema, validateBodyRequest} from '../../middlewares/validatorMiddleware';

const organizationRouter = express.Router();

organizationRouter.post('/organization', validateBodyRequest(createOrganizationRequestSchema), createOrganization);//checked
organizationRouter.get('/organization-all', getAllOrganizations); //checked
organizationRouter.get('/organization-info/', getNamesandCoordinates);
organizationRouter.delete('/organization/:id', deleteOrganization);
organizationRouter.get('/organization/exists/:name', checkOrganizationExists);  //checked
organizationRouter.get('/organization/:id', getOrganization); //checked

export default organizationRouter;
