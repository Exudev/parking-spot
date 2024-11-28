import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "../../config";
import {UserModel,UserCollection } from "./models";
import { RepositoryError } from "../../utils/errors";
import { User, userType } from "../../types/types";
import { loginRequest, loginResponse } from "./types";

 class UserRepository {
  private userCollection = UserCollection;

  public async createUser(user: User): Promise<{ wasCreated: true } | undefined> {
    try {
      const newUserDB = {
        email: user.email,
        name: user.name,
        lastName: user.lastName,
        userType: user.userType,
        password: user.password,
        username: user.username,
      };

      const exists = await UserModel.findOne(
        { username: { $eq: user.username } },
        { collation: { locale: "en", strength: 3 } }
      );
      if (exists) {
        throw new RepositoryError("exists", "already-exists", 409);
      }

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
      const user = await this.userCollection.findOne({ username: { $eq: req.username } });
      if (!user) {
        return {
          type: "error",
          errorCode: "not-found",
          errorMessage: "user-not-found",
          statusCode: 404,
        };
      }

      const auth = await bcrypt.compare(req.password, user.password);
      if (!auth) {
        return {
          type: "error",
          errorCode: "forbidden",
          errorMessage: "username or password are invalid",
          statusCode: 403,
        };
      }

      const token = jwt.sign(
        { email: user.email, username: user.username, userType: user.userType },
        config.secretKey,
        { expiresIn: "1h" }
      );

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


  public async getUser(id: string): Promise<User | undefined> {
    try {
      const objectId = new ObjectId(id);
      const user = await UserModel.findById(objectId).exec();
      return user || undefined;
    } catch (error) {
      throw new RepositoryError("server-error", "server-error", 500, error);
    }
  }
}


export default new UserRepository();