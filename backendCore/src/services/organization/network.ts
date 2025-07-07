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
  createParkingLotRequestSchema,
  deleteOrganizationRequestSchema,
  validateRequest,
} from "../../middlewares/request-schemas";
import passport from "passport";
import { checkPermissions, extractAccountFromToken, isOrganizationUser } from "../../middlewares/AuthMiddleware";

const organizationRouter = express.Router();

// #region For organizations-users to use

organizationRouter.post(
  "/organization",
  validateRequest(createOrganizationRequestSchema),
  createOrganization
);

organizationRouter.delete(
  "/organization/:id", 
  passport.authenticate("jwt", { session: false }),
  isOrganizationUser(),
  checkPermissions(['admin']),
  validateRequest(deleteOrganizationRequestSchema),
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
  isOrganizationUser(),
  checkPermissions(['admin','moderator']),
  validateRequest(createParkingLotRequestSchema),
  addParkingLot
);
organizationRouter.delete(
  "/parking-lot",
  passport.authenticate("jwt", { session: false }),
  isOrganizationUser,
  extractAccountFromToken,
  removeParkingLot
);
organizationRouter.get(
  "parking-lot/",
  passport.authenticate("jwt", { session: false }),
  isOrganizationUser,
  extractAccountFromToken, 
  getAllParkingLot
);

organizationRouter.get(
  "parking-lot/:id",
  passport.authenticate("jwt", { session: false }),
  isOrganizationUser,
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
