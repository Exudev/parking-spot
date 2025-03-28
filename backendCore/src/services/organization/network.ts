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
  getAllParkingLot,
  getParkingLot,
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

organizationRouter.delete(
  "/organization/:id",
  passport.authenticate("jwt", { session: false }),
  extractAccountFromToken,
  deleteOrganization
);
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
organizationRouter.get(
  "parking-lot/",
  passport.authenticate("jwt", { session: false }),
  extractAccountFromToken,
  getAllParkingLot
);

organizationRouter.get(
  "parking-lot/:id",
  passport.authenticate("jwt", { session: false }),
  extractAccountFromToken,
  getParkingLot
);

// #endregion

// TODO: Crear un middleware que tome el token auth y me lo pase al request como account.

//For users to use
organizationRouter.get("/organization-all", getAllOrganizations); //checked
organizationRouter.get("/organization-info/", getNamesandCoordinates);
export default organizationRouter;
