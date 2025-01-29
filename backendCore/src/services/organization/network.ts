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
import passport from 'passport';

const organizationRouter = express.Router();

//For organization 

organizationRouter.post('/organization', validateBodyRequest(createOrganizationRequestSchema), createOrganization);//checked
organizationRouter.get('/organization-all', getAllOrganizations); //checked
organizationRouter.get('/organization-info/', getNamesandCoordinates);
organizationRouter.delete('/organization/:id', deleteOrganization);
organizationRouter.get('/organization/exists/:name', checkOrganizationExists);  //checked
organizationRouter.get('/organization/:id', getOrganization); //checked
organizationRouter.post('parking-lot',passport.authenticate('jwt',{session:false}),)
export default organizationRouter;
