import { ObjectId } from 'mongodb';
import {Organization} from '../../types/types'
import OrganizationModel from "./model"


async function createOrganization(organization: Organization): Promise<boolean | Organization> {
  try {
    const newOrganization = new OrganizationModel(organization);
    return await newOrganization.save();
  } catch (error) {
    console.error('Error occurred during creating organization:', error);
    return false;
  }
}

async function getNamesandCoordenates(): Promise<Organization[]> {
  try {
    const organizations = await OrganizationModel.find({}, 'organizationName location locationDelta');
    return organizations;
  } catch (error) {
    throw new Error('An error occurred while fetching organization names and coordinates: ' + error);
  }
}

async function getOrganization(organizationId: string): Promise<Organization | null> {
  try {
    const objectId = new ObjectId(organizationId);
    const organization = await OrganizationModel.findById(objectId).exec();
    return organization;
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

async function checkOrganizationExists(email: string): Promise<boolean> {
  try {
    const organizationFound = await OrganizationModel.findOne({ email });
    return !!organizationFound;
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
