import { ObjectId } from "mongodb";
import {
  OrganizationModel,
  OrganizationDBModel,
  OrganizationCollection,
} from "./models";
import { UserCollection } from "../user/models";
import {
  addParkingLotRequest,
  addParkingLotResponse,
  checkOrganizationExistsRequest,
  checkOrganizationExistsResponse,
  createOrganizationRequest,
  createOrganizationResponse,
  deleteOrganizationRequest,
  deleteOrganizationResponse,
  getAllOrganizationRequest,
  getAllOrganizationResponse,
  getNamesandCoordenatesRequest,
  getNamesandCoordenatesResponse,
  getOrganizationRequest,
  getOrganizationResponse,
} from "./types";
import { hashValue } from "../../shared/utils";
// For Organizations

class OrganizationRepository {
  private organizationCollection = OrganizationCollection;
  private userCollection = UserCollection;

  public async createOrganization(
    req: createOrganizationRequest
  ): Promise<createOrganizationResponse> {
    const exists = await this.organizationCollection.findOne({
      type: "organization",
      organizationId: { $eq: req.organization.organizationId },
    });
    if (exists?._id) {
      return {
        type: "error",
        errorCode: "exists",
        errorMessage: "already-exists",
        statusCode: 409,
      };
    }
    const createOrg = await this.organizationCollection.insertOne({
      type: "organization",
      organizationId: req.organization.organizationId,
      name: req.organization.name,
      location: req.organization.location,
      locationDelta: req.organization.locationDelta,
      settings: req.organization.settings,
    });
    const userExists = await this.userCollection.findOne({
      type: "user",
      email: req.user.email,
    });
    if (!userExists) {
      const hashedPassword = await hashValue(req.user.password);
      const user = await this.userCollection.insertOne({
        type: "user",
        email: req.user.email,
        organizationId: req.organization.organizationId,
        username: req.user.username,
        name: req.user.name,
        lastName: req.user.lastname,
        permission: req.user.permissions,
        password: hashedPassword,
      });
      if (!user.insertedId) {
        return {
          type: "error",
          errorCode: "server-error",
          errorMessage: "error-creating-user",
          statusCode: 500,
        };
      }
    }
    if (createOrg.insertedId) {
      return {
        type: "response",
        organizationId: String(createOrg.insertedId),
      };
    }
    return {
      type: "error",
      errorCode: "server-error",
      errorMessage: "error-creating-organization",
      statusCode: 500,
    };
  }
  public async deleteOrganization(
    req: deleteOrganizationRequest
  ): Promise<deleteOrganizationResponse> {
    try {
      const result = await this.organizationCollection.deleteOne({
        organizationId: { $eq: req.organizationId },
      });
      if (result.acknowledged) {
        return {
          type: "response",
          success: true,
        };
      } else {
        return {
          type: "error",
          errorCode: "server-error",
          errorMessage: "error-deleting-organization",
          statusCode: 500,
        };
      }
    } catch (error) {
      console.error("Error occurred during deleting organization:", error);
      return {
        type: "error",
        errorCode: "server-error",
        errorMessage: "server-error",
        statusCode: 500,
      };
    }
  }
  public async getOrganization(
    req: getOrganizationRequest
  ): Promise<getOrganizationResponse> {
    try {
      const objectId = new ObjectId(req.organizationId);
      const organization =
        await OrganizationCollection.findOne<OrganizationDBModel>({
          _id: objectId,
        });
      if (organization) {
        return {
          type: "response",
          organization: {
            organizationId: organization.organizationId,
            name: organization.name,
            settings: organization.settings,
            location: organization.location,
            locationDelta: organization.locationDelta,
          },
        };
      } else
        return {
          type: "error",
          errorCode: "not-found",
          errorMessage: "organization-not-found",
          statusCode: 404,
        };
    } catch (error) {
      console.error("Error occurred during searching organization:", error);
      throw error;
    }
  }
  public async checkOrganizationExists(
    req: checkOrganizationExistsRequest
  ): Promise<checkOrganizationExistsResponse> {
    try {
      const organizationFound = await OrganizationModel.findOne(
        { organizationId: { $eq: req.organizationId } },
        { collation: "en", strength: 3 }
      );
      if (organizationFound) {
        return {
          type: "response",
          exists: true,
        };
      } else {
        return { type: "response", exists: false };
      }
    } catch (error) {
      console.error("Error occurred during searching organization:", error);
      return {
        type: "error",
        errorCode: "server-error",
        errorMessage: "server-error",
        statusCode: 500,
      };
    }
  }

  public async getNamesandCoordenates(
    _req: getNamesandCoordenatesRequest
  ): Promise<getNamesandCoordenatesResponse> {
    try {
      const organizations = await OrganizationModel.find(
        {},
        "name location locationDelta"
      );
      return {
        type: "response",
        organizations: organizations,
      };
    } catch (error) {
      return {
        type: "error",
        errorCode: "server-error",
        errorMessage: "server-error",
        statusCode: 500,
      };
    }
  }

  public async getAllOrganization(
    _req: getAllOrganizationRequest
  ): Promise<getAllOrganizationResponse> {
    try {
      const organizations = await OrganizationModel.find();
      return {
        type: "response",
        organizations: organizations,
      };
    } catch (error) {
      console.error("Error occurred during fetching all organizations:", error);
      return {
        type: "error",
        errorCode: "server-error",
        errorMessage: "server-error",
        statusCode: 500,
      };
    }
  }
  public async addParkingLot(
    req: addParkingLotRequest
  ): Promise<addParkingLotResponse> {
    const exists = await this.organizationCollection.findOne({
      type: "parking-lot",
      organizationId: req.account.organizationId,
      name: req.parkingLot.name,
    });
    if (exists?._id) {
      return {
        type: "error",
        errorCode: "exists",
        errorMessage: "already-exists",
        statusCode: 409,
      };
    }
    const createParkingLot = await this.organizationCollection.insertOne({
      type: "parking-lot",
      organizationId: req.account.organizationId,
      name: req.parkingLot.name,
      location: req.parkingLot.location,
    });
    if (createParkingLot.insertedId) {
      return {
        type: "response",
        success: true,
      };
    }
    return {
      type: "error",
      errorCode: "server-error",
      errorMessage: "error-creating-parking-lot",
      statusCode: 500,
    };
  }
}

export default new OrganizationRepository();
