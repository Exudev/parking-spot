import express from "express";
import {
  createOrganization,
  getOrganization,
  getAllOrganizations,
  deleteOrganization,
  checkOrganizationExists,
  getNamesAndCoordinates,
  addParkingLot,
  removeParkingLot,
  getAllParkingLot,
  getParkingLot,
  removeParking,
  getParkingsByParkingLot,
  addParking,
} from "./controller";
import {
  createOrganizationRequestSchema,
  deleteOrganizationRequestSchema,
  validateRequest,
} from "../../middlewares/validatorMiddleware";
import passport from "passport";
import { extractAccountFromToken } from "../../middlewares/AuthMiddleware";

const organizationRouter = express.Router();

// #region For organizations-users to use

organizationRouter.post(
  "/organization",
  validateRequest(createOrganizationRequestSchema),
  createOrganization
);

organizationRouter.delete(
  "/organization/:id", 
  validateRequest(deleteOrganizationRequestSchema),
  passport.authenticate("jwt", { session: false }),
  extractAccountFromToken,
  deleteOrganization
);
organizationRouter.get("/organization/exists/:name", checkOrganizationExists);
organizationRouter.get("/organization/:id", getOrganization);

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

organizationRouter.get(
  "parking-lot/parkings/:id",
  passport.authenticate("jwt", { session: false }),
  extractAccountFromToken,
  getParkingsByParkingLot
);


// #endregion

//#region parking
organizationRouter.post(
  "/parking",
  passport.authenticate("jwt", { session: false }),
  extractAccountFromToken,
  addParking
);
organizationRouter.delete(
  "/parking",
  passport.authenticate("jwt", { session: false }),
  extractAccountFromToken,
  removeParking
);
//#endregion

//#endregion

// #region For users to use
organizationRouter.get("/organization-all", getAllOrganizations);
organizationRouter.get("/organization-info/", getNamesAndCoordinates);

//#endregion
export default organizationRouter;
