import { ObjectId } from "mongodb";
import { errorCode, Organization } from "../../types/types";
import OrganizationModel from "./models";
import { RepositoryError } from "../../utils/errors";
import { createOrganizationResponse } from "./types";
// For Organizations
async function createOrganization(organization: Organization): Promise<
  | {
    type:"response";
      wasCreated: boolean;
      organizationId: unknown;
    }
  | {
      type: 'error'
      errorCode: errorCode;
      errorMessage: string;
    }
> {
  try {
    const newOrganization = new OrganizationModel(organization);
    //checking if exists
    const exists = await OrganizationModel.findOne(
      { name: { $eq: newOrganization.name } },
      { collation: "en", strength: 3 }
    );

    if (exists) {
     new RepositoryError("exists", "already-exists", 409);
     return {
      type: "error",
      errorCode: "exists",
      errorMessage:"already-exists",
     }
    }

    const created = await newOrganization.save();
    // Crear usuario para esa organizacion como owner y hacer el settings de una org.
    if (created) {
      return {
        type: "response",
        wasCreated: true,
        organizationId: created._id,
      };
    } 
    return {
      type: "error",
      errorCode: "server-error",
      errorMessage: "Error al crear la organizacion",
    }
  } catch (error) {
    new RepositoryError("server-error", "server-error", 409, error);
    return {
      type: "error",
      errorCode: "server-error",
      errorMessage: "server-error",
    }
  }
}

async function deleteOrganization(
  id: string
): Promise<{ deletedCount?: number }> {
  try {
    const result = await OrganizationModel.deleteOne({ _id: id });
    return result;
  } catch (error) {
    console.error("Error occurred during deleting organization:", error);
    throw error;
  }
}

async function getOrganization(
  organizationId: string
): Promise<Organization | undefined> {
  try {
    const objectId = new ObjectId(organizationId);
    const organization = await OrganizationModel.findById(objectId).exec();
    if (organization) {
      return organization;
    } else return undefined;
  } catch (error) {
    console.error("Error occurred during searching organization:", error);
    throw error;
  }
}

async function checkOrganizationExists(
  name: string
): Promise<boolean | undefined> {
  try {
    const organizationFound = await OrganizationModel.findOne(
      { name: { $eq: name } },
      { collation: "en", strength: 3 }
    );
    if (organizationFound) {
      return true;
    } else false;
  } catch (error) {
    console.error("Error occurred during searching organization:", error);
    return false;
  }
}

// for users
async function getNamesandCoordenates(): Promise<Organization[]> {
  try {
    const organizations = await OrganizationModel.find(
      {},
      "name location locationDelta"
    );
    return organizations;
  } catch (error) {
    throw new Error(
      "An error occurred while fetching organization names and coordinates: " +
        error
    );
  }
}

async function getAllOrganization(): Promise<Organization[]> {
  try {
    const organizations = await OrganizationModel.find();
    return organizations;
  } catch (error) {
    console.error("Error occurred during fetching all organizations:", error);
    throw error;
  }
}

// for moderators

export {
  getAllOrganization as getAll,
  createOrganization as add,
  getOrganization as getOne,
  deleteOrganization as delete,
  checkOrganizationExists as exists,
  getNamesandCoordenates as getAllCoordenates,
};
