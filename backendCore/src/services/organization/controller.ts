import { Request, Response } from "express";
import { Organization, User } from "../../types/types";
import { success, error } from "../../network/response";
import { CreateOrganizationRequest } from "./types";
import OrganizationRepository from "./repository";

async function createOrganization(req: Request, res: Response): Promise<void> {
  try {
    const organization: Organization = req.body.organization;
    const user: User = req.body.user;
    const request: CreateOrganizationRequest = {
      type: "request",
      organization: organization,
      user: user,
    };
    const newOrganization = await OrganizationRepository.createOrganization(
      request
    );
    switch (newOrganization.type) {
      case "response":
        success(req, res, "created", newOrganization.organizationId, 201);
        break;
      case "error":
        error(
          req,
          res,
          newOrganization.errorCode,
          newOrganization.errorMessage
        );
        break;

      default:
        throw new Error("Invalid Option");
    }
  } catch (err) {
    console.error("Error creating organization at controller:", err);
  }
}

async function getOrganization(req: Request, res: Response): Promise<void> {
  try {
    if (!req.account) {
      return error(req, res, "invalid-data", "Account not provided");
    }
    const organization = await OrganizationRepository.getOrganization({
      type: "request",
      organizationId: req.account.organizationId,
      account: req.account,
    });
    switch (organization.type) {
      case "response":
        success(req, res, "fetched", organization.organization, 200);

        break;
      case "error":
        error(req, res, organization.errorCode, organization.errorMessage);
        break;
      default:
        throw new Error("Invalid Option");
    }
  } catch (err) {
    console.error("Error fetching organization:", err);
  }
}

async function getAllOrganizations(req: Request, res: Response): Promise<void> {
  try {
    const organizations = await OrganizationRepository.getAllOrganization();
    switch (organizations.type) {
      case "response":
        success(req, res, "created", organizations.organizations, 201);
        break;
      case "error":
        error(req, res, organizations.errorCode, organizations.errorMessage);
      default:
        break;
    }
  } catch (err) {
    console.error("Error fetching organizations:", err);
  }
}
// TODO: check vulnerabilities
async function deleteOrganization(req: Request, res: Response): Promise<void> {
  try {
    const organizationId: string = req.params.id;
    if (!req.account) {
      return error(req, res, "server-error", "unauthorized", 500);
    }
    const result = await OrganizationRepository.deleteOrganization({
      type: "request",
      organizationId: organizationId,
      account: req.account,
    });
    switch (result.type) {
      case "response":
        success(req, res, "deleted", "Organization deleted successfully");

        break;
      case "error":
        error(req, res, result.errorCode, result.errorMessage);
        break;

      default:
        throw new Error("Invalid Option");
    }
  } catch (err) {
    console.error("Error deleting organization:", err);
  }
}

async function checkOrganizationExists(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const name: string = req.params.name;
    const result = await OrganizationRepository.checkOrganizationExists({
      type: "request",
      organizationId: name,
    });
    switch (result.type) {
      case "response":
        success(req, res, "fetched", { exists: result.exists }, 200);

        break;
      case "error":
        error(req, res, result.errorCode, result.errorMessage, 500);

        break;

      default:
        throw new Error("Invalid Option");
    }
  } catch (err) {
    console.error("Error checking organization existence:", err);
  }
}

async function getNamesAndCoordinates(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const organizations =
      await OrganizationRepository.getOrganizationNamesAndCoordinates({
        type: "request",
      });
    switch (organizations.type) {
      case "response":
        success(req, res, "fetched", JSON.stringify(organizations), 200);
        break;
      case "error":
        error(
          req,
          res,
          organizations.errorCode,
          organizations.errorMessage,
          500
        );
        break;

      default:
        throw new Error("Invalid Option");
    }
  } catch (err) {
    console.error("Error fetching organization names and coordinates:", err);
  }
}

async function addParkingLot(req: Request, res: Response): Promise<void> {
  try {
    const { name, description, location } = req.body;
    if (!req.account) {
      return error(req, res, "server-error", "Internal server error", 500);
    }
    const result = await OrganizationRepository.addParkingLot({
      type: "request",
      name: name,
      description: description,
      location: location,
      account: req.account,
    });
    switch (result.type) {
      case "response":
        success(req, res, "created", { success: result.success });
        break;
      case "error":
        error(req, res, result.errorCode, result.errorMessage);
        break;
      default:
        throw new Error("Invalid Option");
    }
    success(req, res, "created", JSON.stringify(result), 200);
  } catch (err) {
    console.error("Error creating parking lot:", err);
  }
}

async function removeParkingLot(req: Request, res: Response): Promise<void> {
  try {
    const { parkingLotId } = req.body;
    if (!req.account) {
      return error(req, res, "server-error", "Internal server error", 500);
    }
    const result = await OrganizationRepository.removeParkingLot({
      type: "request",
      parkingLotId: parkingLotId,
      account: req.account,
    });
    switch (result.type) {
      case "response":
        success(req, res, "deleted", { success: result.success }, 200);
        break;
      case "error":
        error(req, res, result.errorCode, result.errorMessage);
        break;
      default:
        throw new Error("Invalid Option");
    }
  } catch (err) {
    console.error("Error removing parking lot ", err);
  }
}

async function getParkingLot(req: Request, res: Response): Promise<void> {
  try {
    const parkingLotId = req.params.id;
    if (!req.account) {
      return error(req, res, "server-error", "unauthorized", 401);
    }
    const result = await OrganizationRepository.getParkingLot({
      type: "request",
      account: req.account,
      parkingLotId: parkingLotId,
    });
    if (result.type === "response") {
      success(req, res, "fetched", "parking-lot fetched successfully", 200);
    } else {
      error(req, res, "invalid-data", "parking lot not found", 404);
    }
  } catch (err) {
    console.error("Error fetching parking-lot:", err);
  }
}

async function getParkingsByParkingLot(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const parkingLotId = req.params.id;
    if (!req.account) {
      return error(req, res, "server-error", "unauthorized", 401);
    }
    const result = await OrganizationRepository.getParkingsByParkingLot({
      type: "request",
      account: req.account,
      parkingLotId: parkingLotId,
    });
    switch (result.type) {
      case "response":
        success(req, res, "fetched", "parkings fetched successfully");
        break;
      case "error":
        error(req, res, result.errorCode, result.errorMessage);

        break;
      default:
        throw new Error("Invalid Option");
    }
  } catch (err) {
    console.error("Error fetching parkings:", err);
  }
}

async function getAllParkingLot(req: Request, res: Response): Promise<void> {
  try {
    if (!req.account) {
      return error(req, res, "unauthorized", "unauthorized", 500);
    }
    const result = await OrganizationRepository.getAllParkingLot({
      type: "request",
      account: req.account,
    });

    switch (result.type) {
      case "response":
        success(req, res, "fetched", result.parkingLots, 200);

        break;
      case "error":
        error(req, res, result.errorCode, result.errorMessage);

        break;
      default:
        throw new Error("Invalid Option");
    }
  } catch (err) {
    console.error("Error fetching parking lot ", err);
  }
}

async function addParking(req: Request, res: Response): Promise<void> {
  try {
    const { parking } = req.body;
    if (!req.account) {
      return error(req, res, "server-error", "Internal server error", 500);
    }
    const result = await OrganizationRepository.addParking({
      type: "request",
      parking: parking,
      account: req.account,
    });
    switch (result.type) {
      case "response":
        success(req, res, "created", { success: result.success }, 200);
        break;
      case "error":
        error(req, res, result.errorCode, result.errorMessage);
        break;
      default:
        throw new Error("Invalid Option");
    }
  } catch (err) {
    console.error("Error creating parking:", err);
  }
}

async function removeParking(req: Request, res: Response): Promise<void> {
  try {
    const { parkingLotId } = req.body;
    if (!req.account) {
      return error(req, res, "server-error", "Internal server error", 500);
    }
    const result = await OrganizationRepository.removeParkingLot({
      type: "request",
      parkingLotId: parkingLotId,
      account: req.account,
    });
    switch (result.type) {
      case "response":
        success(req, res, "deleted", { success: result.success });

        break;
      case "error":
        error(req, res, result.errorCode, result.errorMessage);
        break;
      default:
        throw new Error("Invalid Option");
    }
  } catch (err) {
    console.error("Error removing parking ", err);
  }
}

export {
  createOrganization,
  getOrganization,
  getAllOrganizations,
  deleteOrganization,
  checkOrganizationExists,
  getNamesAndCoordinates,
  addParkingLot,
  getParkingsByParkingLot,
  removeParkingLot,
  getAllParkingLot,
  getParkingLot,
  addParking,
  removeParking,
};
