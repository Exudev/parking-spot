import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { SALT_ROUNDS, SECRET_KEY_JWT } from "../../constants/env";
import { UserModel, UserCollection } from "./models";
import { RepositoryError } from "../../utils/errors";
import { User,  } from "../../types/types";
import { createUserRequest, findByEmailResponse, loginRequest, loginResponse } from "./types";

import { compareValue, signToken,  } from "../../shared/utils";
import { permission } from "process";
class UserRepository {
  private userCollection = UserCollection;

  public async createUser(
    req: createUserRequest
  ): Promise<{ wasCreated: true } | undefined> {
    try {
      const exists = await this.userCollection.findOne(
        { username: { $eq: req.user.username } },
        { collation: { locale: "en", strength: 3 } }
      );
      if (exists) {
        throw new RepositoryError("exists", "already-exists", 409);
      }

      const hashedPassword = await bcrypt.hash(req.user.password, SALT_ROUNDS);
      const newUserDB = {
        email: req.user.email,
        name: req.user.name,
        lastName: req.user.lastname,
        permission: req.user.permissions,
        password: hashedPassword,
        username: req.user.username,
      };
      const created = await this.userCollection.insertOne(newUserDB);
      if (created) {
        return { wasCreated: true };
      }
    } catch (error) {
      throw new RepositoryError("server-error", "server-error", 500, error);
    }
  }

  public async login(req: loginRequest): Promise<loginResponse> {
    try {
      const user = await this.userCollection.findOne({
        type: "user",
        email: { $eq: req.username },
      });
      console.log(user);
      if (!user) {
        return {
          type: "error",
          errorCode: "not-found",
          errorMessage: "user-not-found",
          statusCode: 404,
        };
      }

      const auth = await compareValue(req.password,user.password);
      console.log(auth);
      if (!auth) {
        return {
          type: "error",
          errorCode: "forbidden",
          errorMessage: "username or password are invalid",
          statusCode: 403,
        };
      }

      const token = signToken(user.email,user.username, user.userType,user.organizationId)

      return { type: "response", token };
    } catch (error) {
      throw new RepositoryError("server-error", "server-error", 500, error);
    }
  }
                                                                                                                          
   public async deleteUser(id: string): Promise<{ deletedCount?: number }> {
    try {
      const result = await UserModel.deleteOne({ _id: new ObjectId(id) });
      return result;
    } catch (error) {
      throw new RepositoryError("server-error", "server-error", 500, error);
    }
  }

  // public async getUser(id: string): Promise<User | undefined> {
  //   try {
  //     const objectId = new ObjectId(id);
  //     const findinguser = await UserModel.findById(objectId).exec();

  //     return {
      
  //     };
  //   } catch (error) {
  //     throw new RepositoryError("server-error", "server-error", 500, error);
  //   }
  // }

  public async findByEmail(email: string): Promise<findByEmailResponse> {
    try {
      const user = await this.userCollection.findOne({
      type:"user",
      email: {$eq: email}
      });
      if(!user || user.type !== "user"){
        return {
          type:"error",
          errorCode:"not-found",
          errorMessage:"user-not-found",
          statusCode:404,

        }
      }
      return {
        type:"response",
        user:{
          username: user.username,
          email: user.email,
          name: user.name,
          lastname: user.lastName,
          permissions: user.permission,
          password:user.password,
          role:"admin",
          organizationId:user.organizationId
        }
      }
    } catch (error) {
      throw new RepositoryError("server-error", "server-error", 500, error);
    }
  }
  
}

export default new UserRepository();
