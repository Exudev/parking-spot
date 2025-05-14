import { ObjectId } from "mongodb";
import {
  OrganizationModel,
  OrganizationDBModel,
  OrganizationCollection,
  ParkingLotModel,
} from "./models";
import { UserCollection } from "../user/models";
import {
  AddParkingLotRequest,
  AddParkingLotResponse,
  AddParkingRequest,
  AddParkingResponse,
  CheckOrganizationExistsRequest,
  CheckOrganizationExistsResponse,
  CreateOrganizationRequest,
  CreateOrganizationResponse,
  DeleteOrganizationRequest,
  DeleteOrganizationResponse,
  GetAllOrganizationRequest,
  GetAllOrganizationResponse,
  GetAllParkingLotRequest,
  GetAllParkingLotResponse,
  GetNamesAndCoordinatesRequest,
  GetNamesAndCoordinatesResponse,
  GetOrganizationRequest,
  GetOrganizationResponse,
  GetParkingLotRequest,
  GetParkingLotResponse,
  GetParkingsByParkingLotRequest,
  RemoveParkingLotRequest,
  RemoveParkingRequest,
  RemoveParkingResponse,
} from "./types";
import { hashValue } from "../../shared/utils";
import { ParkingLot } from "@src/types/types";
// For Organizations

class OrganizationRepository {
  private organizationCollection = OrganizationCollection;
  private userCollection = UserCollection;

  // Organization users to use
  public async createOrganization(
    req: CreateOrganizationRequest
  ): Promise<CreateOrganizationResponse> {
    const exists = await this.organizationCollection.findOne({
      type: "organization",
      organizationId: { $eq: req.organization.organizationId },
    });
    if (exists && exists._id) {
      return {
        type: "error",
        errorCode: "exists",
        errorMessage: "organizationId-already-exists",
      };
    }
    const createOrg = await this.organizationCollection.insertOne({
      type: "organization",
      organizationId: req.organization.organizationId,
      name: req.organization.name,
      location: req.organization.location,
      locationDelta: req.organization.locationDelta,
      settings: {
        owner: req.user.email,
        plan: "basic",
        active: false,
      },
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
        username: req.user.username,
        name: req.user.name,
        lastName: req.user.lastname,
        password: hashedPassword,
      });
      if (!user.insertedId) {
        return {
          type: "error",
          errorCode: "server-error",
          errorMessage: "error-creating-user",
        };
      }
    }
    const creatingOrganizationUser = await this.userCollection.insertOne({
      type: "organization-user",
      organizationId: req.organization.organizationId,
      username: req.user.username,
      email: req.user.email,
      permissions: "admin",
    });
    if (!creatingOrganizationUser.insertedId) {
      return {
        type: "error",
        errorCode: "server-error",
        errorMessage: "error-creating-organization-user",
      };
    }

    if (createOrg.insertedId && creatingOrganizationUser.insertedId) {
      return {
        type: "response",
        organizationId: createOrg.insertedId.toString(),
      };
    }
    return {
      type: "error",
      errorCode: "server-error",
      errorMessage: "error-creating-organization",
    };
  }
  public async deleteOrganization(
    req: DeleteOrganizationRequest
  ): Promise<DeleteOrganizationResponse> {
    try {
      if (req.organizationId !== req.account.organizationId) {
        return {
          type: "error",
          errorCode: "invalid-data",
          errorMessage: "provided organization Id does not match",
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
        };
      }
    } catch (error) {
      console.error("Error occurred during deleting organization:", error);
      return {
        type: "error",
        errorCode: "server-error",
        errorMessage: "server-error",
      };
    }
  }
  public async getOrganization(
    req: GetOrganizationRequest
  ): Promise<GetOrganizationResponse> {
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
        };
    } catch (error) {
      console.error("Error occurred during searching organization:", error);
      throw error;
    }
  }
  public async checkOrganizationExists(
    req: CheckOrganizationExistsRequest
  ): Promise<CheckOrganizationExistsResponse> {
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
      };
    }
  }

  public async getOrganizationNamesAndCoordinates(
    _req: GetNamesAndCoordinatesRequest
  ): Promise<GetNamesAndCoordinatesResponse> {
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
      };
    }
  }

  public async addParkingLot(
    req: AddParkingLotRequest
  ): Promise<AddParkingLotResponse> {
    const exists = await this.organizationCollection.findOne({
      type: "parking-lot",
      organizationId: req.account.organizationId,
      name: req.name,
    });
    if (exists && exists._id) {
      return {
        type: "error",
        errorCode: "exists",
        errorMessage: "already-exists",
      };
    }
    const createParkingLot = await this.organizationCollection.insertOne({
      type: "parking-lot",
      organizationId: req.account.organizationId,
      name: req.name,
      location: req.location,
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
    };
  }
  public async removeParkingLot(
    req: RemoveParkingLotRequest
  ): Promise<AddParkingLotResponse> {
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
    };
  }
  public async getParkingLot(
    req: GetParkingLotRequest
  ): Promise<GetParkingLotResponse> {
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
  public async getParkingsByParkingLot(
    req: GetParkingsByParkingLotRequest
  ): Promise<GetParkingLotResponse> {
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
    req: GetAllParkingLotRequest
  ): Promise<GetAllParkingLotResponse> {
    const parkingLots = await ParkingLotModel.find({
      type: "parking-lot",
      organizationId: req.account.organizationId,
    });

    return {
      type: "response",
      parkingLots: parkingLots,
    };
  }
  public async addParking(req: AddParkingRequest): Promise<AddParkingResponse> {
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
      };
    }
    const exists = await this.organizationCollection.findOne({
      type: "parking",
      parkingLotId: req.parking.parkingLotId,
      name: req.parking.name,
    });
    if (exists && exists._id) {
      return {
        type: "error",
        errorCode: "exists",
        errorMessage: "already exists",
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
    };
  }
  public async removeParking(
    req: RemoveParkingRequest
  ): Promise<RemoveParkingResponse> {
    const exists = await this.organizationCollection.findOne({
      type: "parking",
      _id: new ObjectId(req.parkingId),
    });
    if (!exists) {
      return {
        type: "error",
        errorCode: "not-found",
        errorMessage: "couldn't found parking",
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
    };
  }

  // For driver users to use

  public async getAllOrganization(
    _req: GetAllOrganizationRequest
  ): Promise<GetAllOrganizationResponse> {
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
      };
    }
  }
}

export default new OrganizationRepository();
