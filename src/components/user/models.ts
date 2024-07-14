import { Schema, model, Document} from 'mongoose'
import { userType } from '../../types/types';

export interface IUser extends Document {
    username: string;
    email: string;
    name: string;
    lastName: string;
    userType: userType;  //change
    password: string;
}