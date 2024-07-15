import { Schema, model, Document} from 'mongoose'
import { userType } from '../../types/types';

export interface IUser extends Document {
    username: string;
    email: string;
    name: string;
    lastName: string;
    userType: userType;
    password: string;
}
const UserSchema = new Schema<IUser>({
    email: { type: String, required: true },
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    userType: {type: String, required: true},
    password: {type: String, required: true},
    username: { type: String, required: true },
  },{ timestamps: true });
  
  const UserModel = model<IUser>('User', UserSchema);
  UserSchema.index({ name: 1 }, { collation: { locale: 'en', strength: 3 } });
  export default UserModel;
  