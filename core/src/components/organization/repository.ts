import { ObjectId } from "mongodb";
import { errorCode, Organization, User } from "../../types/types";
import bcrypt from "bcrypt";
import {
  OrganizationModel,
  IOrganization,
  OrganizationCollection,
} from "./models";
import { UserCollection, UserModel } from "../user/models";
import {
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
    if (exists) {
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
      owner: req.user.email,
    });
    const userExists = await this.userCollection.findOne({
      type: "user",
      email: req.user.email,
    });
    const hashedPassword = await bcrypt.hash(req.user.password, 10);
    if (!userExists) {
      const user = await this.userCollection.insertOne({
        type: "user",
        email: req.user.email,
        username: req.user.username,
        name: req.user.name,
        lastName: req.user.lastName,
        userType: req.user.userType,
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

    if (createOrg) {
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
      const organization = await OrganizationCollection.findOne<IOrganization>({
        _id: objectId,
      });
      if (organization) {
        return {
          type: "response",
          organization: {
            organizationId: organization.organizationId,
            name: organization.name,
            owner: organization.owner,
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
    req: getNamesandCoordenatesRequest
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
    req: getAllOrganizationRequest
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
}

export default new OrganizationRepository();
