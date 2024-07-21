import { ObjectId } from 'mongodb';
import {User, userType} from '../../types/types'
import UserModel from './models'
import { RepositoryError } from '../../utils/errors';

async function createUser(user: User): Promise<{wasCreated: true} | undefined>{
    try{
        const newUserDB = {
            email: user.email,
            name: user.name,
            lastName: user.lastName,
            userType: user.userType, // Asegúrate de que 'admin' es un valor válido para userType
            password: user.password,
            username: user.username,
            createdAt: new Date(), // Agrega manualmente si usas timestamps en tu esquema
            updatedAt: new Date(), // Agrega manualmente si usas timestamps en tu esquema
          };
      
        const exists = await UserModel.findOne({username:{$eq:user.username }},{collation:'en', strength: 3});
        if(exists)
            {
                throw new RepositoryError('exists',409, "already-exists");
            }
        const created = await UserModel.collection.insertOne(newUserDB);
        if(created){
            return{
                wasCreated:true
            }
        }
    }catch (error){
        throw new RepositoryError('server-error',409, error);
}
} 

async function deleteUser(id: string): Promise<{deletedCount?: number}>{
    try {
        const result = await UserModel.deleteOne({_id: id});
        return result;
    } catch (error) {
        throw new RepositoryError('server-error',409, error);
    }
}
async function getUser(id: string): Promise<User | undefined>{
    try {
        const objectId = new ObjectId(id);
        const user = await UserModel.findById(objectId).exec();
        if(user)
            {
              return user;
            }
          else return undefined;
    } catch (error) {
        throw new RepositoryError('server-error',409, error);
    }
}

export {
    createUser as createUser,
    deleteUser as deleteUser,
    getUser as getUser,

};