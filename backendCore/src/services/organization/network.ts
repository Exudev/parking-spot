import express from "express";
import {
  createOrganization,
  getOrganization,
  getAllOrganizations,
  deleteOrganization,
  checkOrganizationExists,
  getNamesandCoordinates,
  addParkingLot,
  removeParkingLot,
} from "./controller";
import {
  createOrganizationRequestSchema,
  validateBodyRequest,
} from "../../middlewares/validatorMiddleware";
import passport from "passport";
import { extractAccountFromToken } from "../../middlewares/AuthMiddleware";

const organizationRouter = express.Router();

//For organizations-users to use

organizationRouter.post(
  "/organization",
  validateBodyRequest(createOrganizationRequestSchema),
  createOrganization
); //checked
organizationRouter.get("/organization-all", getAllOrganizations); //checked
organizationRouter.get("/organization-info/", getNamesandCoordinates);
organizationRouter.delete("/organization/:id", deleteOrganization);
organizationRouter.get("/organization/exists/:name", checkOrganizationExists); //checked
organizationRouter.get("/organization/:id", getOrganization); //checked

// #region parking-lot
organizationRouter.post(
  "/parking-lot",
  passport.authenticate("jwt", { session: false }),
  extractAccountFromToken,
  addParkingLot
);
organizationRouter.delete(
  "/parking-lot",
  passport.authenticate("jwt", { session: false }),
  extractAccountFromToken,
  removeParkingLot
);

// #endregion



// Crear un middleware que tome el token auth y me lo pase al request como account.

//For users to use
export default organizationRouter;
