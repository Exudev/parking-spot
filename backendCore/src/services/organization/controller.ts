import { Request, Response, } from "express";
import { User } from "../../types/types";
import { success, error } from "../../network/response";
import { createOrganizationRequest } from "./types";
import OrganizationRepository from "./repository";

async function createOrganization(req: Request, res: Response): Promise<void> {
  try {
    const { organizationId, name, location, locationDelta } = req.body;
    const user: User = req.body.user;
    const request: createOrganizationRequest = {
      type: "request",
      organization: {
        organizationId: organizationId,
        name: name,
        settings: {
          owner: user.email,
        },
        location: location,
        locationDelta: locationDelta,
      },
      user: user,
    };
    const newOrganization = await OrganizationRepository.createOrganization(
      request
    );
    if (newOrganization.type === "response") {
      success(req, res, "created", { newOrganization }, 201);
    } else {
      error(req, res, "exists", "already-exists", 500);
    }
  } catch (err) {
    console.error("Error creating organization:", err);
  }
}

async function getOrganization(req: Request, res: Response): Promise<void> {
  try {
    const organizationId: string = req.params.id;
    if(!req.account){
      return error(req, res, "invalid-data", "Organization not found", 404);
       
    }
    const organization = await OrganizationRepository.getOrganization({
      type: "request",
      organizationId: organizationId,
      account: req.account
    });
    if (organization) {
      success(req, res, "fetched", {organization}, 200);
    } else {
      error(req, res, "invalid-data", "Organization not found", 404);
    }
  } catch (err) {
    console.error("Error fetching organization:", err);
    error(req, res, "server-error", "Internal server error", 500);
  }
}

async function getAllOrganizations(req: Request, res: Response): Promise<void> {
  try {
    const organizations = await OrganizationRepository.getAllOrganization({
      type: "request",
    });
    success(req, res, "fetched", {organizations}, 200);
  } catch (err) {
    console.error("Error fetching organizations:", err);
    error(req, res, "server-error", "Internal server error", 500);
  }
}

async function deleteOrganization(req: Request, res: Response): Promise<void> {
  try {
    const organizationId: string = req.params.id;
    if(!req.account)
    {
    return error(req, res, "server-error", "unauthorized", 500);
    }
    const result = await OrganizationRepository.deleteOrganization({
      type: "request",
      organizationId: organizationId,
      account:req.account,
    });
    if (result.type === "response") {
      success(req, res, "deleted", "Organization deleted successfully", 200);
    } else {
      error(req, res, "invalid-data", "Organization not found", 404);
    }
  } catch (err) {
    console.error("Error deleting organization:", err);
    error(req, res, "server-error", "Internal server error", 500);
  }
}

async function checkOrganizationExists(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const name: string = req.params.name;
    const exists = await OrganizationRepository.checkOrganizationExists({
      type: "request",
      organizationId: name,
    });
    if (exists) {
      success(req, res, "fetched", "Organization exists", 200);
    } else {
      error(req, res, "invalid-data", "Organization not found", 400);
    }
  } catch (err) {
    console.error("Error checking organization existence:", err);
    error(req, res, "server-error", "Internal server error", 500);
  }
}

async function getNamesandCoordinates(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const organizations = await OrganizationRepository.getOrganizationNamesandCoordenates({
      type: "request",
    });
    success(req, res, "fetched", JSON.stringify(organizations), 200);
  } catch (err) {
    console.error("Error fetching organization names and coordinates:", err);
    error(req, res, "server-error", "Internal server error", 500);
  }
}

async function addParkingLot(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const { parkingLot} = req.body;
    if(!req.account){
    return error(req, res, "server-error", "Internal server error", 500);
    }
    const creatingParkingLot = await OrganizationRepository.addParkingLot({
      type: "request",
      parkingLot: parkingLot,
      account: req.account,
    });
    success(req, res, "created", JSON.stringify(creatingParkingLot), 200);
  } catch (err) {
    console.error("Error creating parking lot:", err);
    error(req, res, "server-error", "Internal server error", 500);
  }
}

async function removeParkingLot(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const { parkingLotId} = req.body;
    if(!req.account){
    return error(req, res, "server-error", "Internal server error", 500);
    }
    const removingParkingLot = await OrganizationRepository.removeParkingLot({
      type: "request",
      parkingLotId:parkingLotId, 
      account: req.account,
    });
    success(req, res, "deleted", JSON.stringify(removingParkingLot), 200);
  } catch (err) {
    console.error("Error removing parking lot ", err);
    error(req, res, "server-error", "Internal server error", 500);
  }
}

export {
  createOrganization,
  getOrganization,
  getAllOrganizations,
  deleteOrganization,
  checkOrganizationExists,
  getNamesandCoordinates,
  addParkingLot,
  removeParkingLot
};
