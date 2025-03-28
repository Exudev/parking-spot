import { ObjectId } from "mongodb";
import {
  OrganizationModel,
  OrganizationDBModel,
  OrganizationCollection,
  ParkingLotModel,
} from "./models";
import { UserCollection } from "../user/models";
import {
  addParkingLotRequest,
  addParkingLotResponse,
  addParkingRequest,
  addParkingResponse,
  checkOrganizationExistsRequest,
  checkOrganizationExistsResponse,
  createOrganizationRequest,
  createOrganizationResponse,
  deleteOrganizationRequest,
  deleteOrganizationResponse,
  getAllOrganizationRequest,
  getAllOrganizationResponse,
  getAllParkingLotRequest,
  getAllParkingLotResponse,
  getNamesAndCoordinatesRequest,
  getNamesAndCoordinatesResponse,
  getOrganizationRequest,
  getOrganizationResponse,
  getParkingLotRequest,
  getParkingLotResponse,
  removeParkingLotRequest,
  removeParkingRequest,
  removeParkingResponse,
} from "./types";
import { hashValue } from "../../shared/utils";
import { ParkingLot } from "@src/types/types";
// For Organizations

class OrganizationRepository {
  private organizationCollection = OrganizationCollection;
  private userCollection = UserCollection;

  // Organization users to use
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
        errorMessage: "organizationId-already-exists",
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
        organizationId: createOrg.insertedId.toString(),
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
      // ask for a prompt org id to user and check it
      if (req.organizationId !== req.account.organizationId) {
        return {
          type: "error",
          errorCode: "invalid-data",
          errorMessage: "provided organization Id does not match",
          statusCode: 500,
        };
      }

      //TODO: This iis not deleting everything of the organization : parking-spots
      const result = await this.organizationCollection.deleteOne({
        type: "organization",
        organizationId: { $eq: req.account.organizationId },
      });

      const deletedParkingLots = await this.organizationCollection
        .find(
          {
            type: "parking-lot",
            organizationId: { $eq: req.account.organizationId },
          },
          { projection: { _id: 1 } }
        )
        .toArray();

      const parkingLotIds = deletedParkingLots.map((doc) => doc._id);

      const deletingParkingLots = await this.organizationCollection.deleteMany({
        type: "parking-lot",
        organizationId: { $eq: req.account.organizationId },
      });

      if (!deletingParkingLots.acknowledged) {
        return {
          type: "error",
          errorCode: "server-error",
          errorMessage: "error deleting parking lots",
          statusCode: 500,
        };
      }

      if (parkingLotIds.length > 0) {
        const deletingParking = await this.organizationCollection.deleteMany({
          type: "parking",
          parkingLotId: { $in: parkingLotIds },
        });

        if (!deletingParking.acknowledged) {
          return {
            type: "error",
            errorCode: "server-error",
            errorMessage: "error deleting parking",
            statusCode: 500,
          };
        }
      }

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
      const organization =
        await OrganizationCollection.findOne<OrganizationDBModel>({
          organizationId: req.account,
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

  public async getOrganizationNamesAndCoordinates(
    _req: getNamesAndCoordinatesRequest
  ): Promise<getNamesAndCoordinatesResponse> {
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
      console.error(error);
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
  public async removeParkingLot(
    req: removeParkingLotRequest
  ): Promise<addParkingLotResponse> {
    const exists = await this.organizationCollection.findOne({
      type: "parking-lot",
      organizationId: req.account.organizationId,
      _id: new ObjectId(req.parkingLotId),
    });
    if (!exists) {
      return {
        type: "error",
        errorCode: "not-found",
        errorMessage: "couldn't found organization",
        statusCode: 409,
      };
    }
    const deletingParkingLot = await this.organizationCollection.deleteOne({
      type: "parking-lot",
      organizationId: req.account.organizationId,
      _id: new ObjectId(req.parkingLotId),
    });
    if (deletingParkingLot.acknowledged) {
      return {
        type: "response",
        success: true,
      };
    }
    return {
      type: "error",
      errorCode: "server-error",
      errorMessage: "couldn't delete parking lot",
      statusCode: 500,
    };
  }
  public async getParkingLot(
    req: getParkingLotRequest
  ): Promise<getParkingLotResponse> {
    const organization = await this.organizationCollection.findOne({
      type: "parking-lot",
      organizationId: req.account.organizationId,
      _id: new ObjectId(req.parkingLotId),
    });
    if (!organization) {
      return {
        type: "error",
        errorCode: "not-found",
        errorMessage: "couldn't found organization",
        statusCode: 409,
      };
    }
    const parkingLot: ParkingLot = {
      name: organization.name,
      organizationId: organization.organizationId,
      description: organization.description,
      location: organization.location,
    };

    return {
      type: "response",
      parkingLot: parkingLot,
    };
  }

  public async getAllParkingLot(
    req: getAllParkingLotRequest
  ): Promise<getAllParkingLotResponse> {
    const parkingLots = await ParkingLotModel.find({
      type: "parking-lot",
      organizationId: req.account.organizationId,
    });

    return {
      type: "response",
      parkingLots: parkingLots,
    };
  }
  public async addParking(req: addParkingRequest): Promise<addParkingResponse> {
    const existsParkingLot = await this.organizationCollection.findOne({
      type: "parking-lot",
      organizationId: req.account.organizationId,
      parkingLotId: req.parking.parkingLotId,
    });
    if (!existsParkingLot) {
      return {
        type: "error",
        errorCode: "not-found",
        errorMessage: "parking lot not found",
        statusCode: 409,
      };
    }
    const exists = await this.organizationCollection.findOne({
      type: "parking",
      parkingLotId: req.parking.parkingLotId,
      name: req.parking.name,
    });
    if (exists?._id) {
      return {
        type: "error",
        errorCode: "exists",
        errorMessage: "already exists",
        statusCode: 400,
      };
    }
    const createParking = await this.organizationCollection.insertOne({
      type: "parking",
      organizationId: req.account.organizationId,
      name: req.parking.name,
    });
    if (createParking.insertedId) {
      return {
        type: "response",
        success: true,
      };
    }
    return {
      type: "error",
      errorCode: "server-error",
      errorMessage: "error-creating-parking",
      statusCode: 500,
    };
  }
  public async removeParking(
    req: removeParkingRequest
  ): Promise<removeParkingResponse> {
    const exists = await this.organizationCollection.findOne({
      type: "parking",
      _id: new ObjectId(req.parkingId),
    });
    if (!exists) {
      return {
        type: "error",
        errorCode: "not-found",
        errorMessage: "couldn't found parking",
        statusCode: 409,
      };
    }
    const deletingParking = await this.organizationCollection.deleteOne({
      type: "parking",
      _id: new ObjectId(req.parkingId),
    });
    if (deletingParking.acknowledged) {
      return {
        type: "response",
        success: true,
      };
    }
    return {
      type: "error",
      errorCode: "server-error",
      errorMessage: "couldn't delete parking",
      statusCode: 500,
    };
  }

  // For driver users to use

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
        errorMessage: "Error occurred during fetching all organizations",
        statusCode: 500,
      };
    }
  }
}

export default new OrganizationRepository();
