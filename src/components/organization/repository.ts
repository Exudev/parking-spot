import { ObjectId } from 'mongodb';
import {Organization} from '../../types/types'
import OrganizationModel from "./models"
import { RepositoryError } from '../../utils/errors';


async function createOrganization(organization: Organization): Promise<{wasCreated: true}| undefined> {
  try {
    const newOrganization = new OrganizationModel(organization);
    //checking if exists 
   const exists = await checkOrganizationExists(organization.name);
   if(exists)
    {
      throw new RepositoryError('exists',409, "already-exists");
    }

    const created = await newOrganization.save();
    if(created)
      {
        return {wasCreated: true};
      }
  } catch (error) {
    throw new RepositoryError('server-error',409, error);
  }
}

async function getNamesandCoordenates(): Promise<Organization[]> {
  try {
    const organizations = await OrganizationModel.find({}, 'name location locationDelta');
    return organizations;
  } catch (error) {
    throw new Error('An error occurred while fetching organization names and coordinates: ' + error);
  }
}

async function getOrganization(organizationId: string): Promise<Organization | undefined> {
  try {
    const objectId = new ObjectId(organizationId);
    const organization = await OrganizationModel.findById(objectId).exec();
    if(organization)
      {
        return organization;
      }
    else return undefined;
  } catch (error) {
    console.error('Error occurred during searching organization:', error);
    throw error;
  }
}

async function getAllOrganization(): Promise<Organization[]> {
  try {
    const organizations = await OrganizationModel.find();
    return organizations;
  } catch (error) {
    console.error('Error occurred during fetching all organizations:', error);
    throw error;
  }
}

async function deleteOrganization(id: string): Promise<{ deletedCount?: number }> {
  try {
    const result = await OrganizationModel.deleteOne({ _id: id });
    return result;
  } catch (error) {
    console.error('Error occurred during deleting organization:', error);
    throw error;
  }
}

async function checkOrganizationExists(name: string): Promise<boolean | undefined> {
  try {
    const organizationFound = await OrganizationModel.findOne({ name: {$eq :name} });
   if(organizationFound){
    return true
   }
    else false;
  } catch (error) {
    console.error('Error occurred during searching organization:', error);
    return false;
  }
}

export {
  getAllOrganization as getAll,
  createOrganization as add,
  getOrganization as getOne,
  deleteOrganization as delete,
  checkOrganizationExists as exists,
  getNamesandCoordenates as getAllCoordenates,
};
