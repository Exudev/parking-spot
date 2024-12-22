import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { SALT_ROUNDS, SECRET_KEY_JWT } from "../../constants/env";
import { UserModel, UserCollection } from "./models";
import { RepositoryError } from "../../utils/errors";
import { User, userType } from "../../types/types";
import { createUserRequest, loginRequest, loginResponse } from "./types";

import { compareValue } from "../../shared/utils";
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
        userType: req.user.userType,
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

      const auth = await bcrypt.compare(req.password, user.password);
      console.log(auth);
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
        SECRET_KEY_JWT,
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
