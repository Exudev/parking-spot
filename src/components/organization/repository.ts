import { Organization } from "../../types/types";

const model = require('./model')

const {ObjectId} = require('mongodb');

async function createOrganization(organization:Organization) {
    const newOrganization = new model(organization);
    await newOrganization.save();
    console.log('Organization saved:', newOrganization);
}

