import { Request, Response, NextFunction } from "express";
import { Organization, User } from "../../types/types";
import { success, error } from "../../network/response";
import { AppError, RepositoryError, ValidationError } from "../../utils/errors";
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
    const organization = await OrganizationRepository.getOrganization({
      type: "request",
      organizationId: organizationId,
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
    const result = await OrganizationRepository.deleteOrganization({
      type: "request",
      organizationId: organizationId,
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
    const organizations = await OrganizationRepository.getNamesandCoordenates({
      type: "request",
    });
    success(req, res, "fetched", JSON.stringify(organizations), 200);
  } catch (err) {
    console.error("Error fetching organization names and coordinates:", err);
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
};
