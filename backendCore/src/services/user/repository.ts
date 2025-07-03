import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";
import { SALT_ROUNDS } from "../../constants/env";
import { UserModel, UserCollection } from "./models";
import { RepositoryError } from "../../utils/errors";
import {
  CreateDriverRequest,
  CreateUserRequest,
  FindByEmailResponse,
  FindDriverByEmailResponse,
  LoginRequest,
  LoginResponse,
} from "./types";

import { compareValue, hashValue, signToken } from "../../shared/utils";
class UserRepository {
  private userCollection = UserCollection;

  public async createUser(
    req: CreateUserRequest
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
        password: hashedPassword,
        username: req.user.username,
      };
      const created = await this.userCollection.insertOne(newUserDB);
      if (created) {
        return { wasCreated: true };
      }
    } catch (error) {
      throw new RepositoryError("server-error", "server-error", error);
    }
  }

  public async createOrganizationUser(
    req: CreateUserRequest
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
      throw new RepositoryError("server-error", "server-error", error);
    }
  }

  public async login(req: LoginRequest): Promise<LoginResponse> {
    try {
      const user = await this.userCollection.findOne({
        type: "user",
        email: { $eq: req.username },
      });
      console.log("pasa por user/repository/login");
      if (!user) {
        return {
          type: "error",
          errorCode: "not-found",
          errorMessage: "user-not-found",
        };
      }

      const auth = await compareValue(req.password, user.password);
      console.log(auth);
      if (!auth) {
        return {
          type: "error",
          errorCode: "forbidden",
          errorMessage: "username or password are invalid",
        };
      }

      const token = signToken(
        user.email,
        user.username,
        user.userType,
        user.organizationId
      );

      return { type: "response", token };
    } catch (error) {
      throw new RepositoryError("server-error", "server-error", error);
    }
  }

  public async deleteUser(id: string): Promise<{ deletedCount?: number }> {
    try {
      const result = await UserModel.deleteOne({ _id: new ObjectId(id) });
      return result;
    } catch (error) {
      throw new RepositoryError("server-error", "server-error", error);
    }
  }

  public async findUserByEmail(email: string): Promise<FindByEmailResponse> {
    try {
      console.log("pasa por findUserByEmail")
      const user = await this.userCollection.findOne({
        type: "user",
        email: { $eq: email },
      });
      if (!user || user.type !== "user") {
        return {
          type: "error",
          errorCode: "not-found",
          errorMessage: "user-not-found",
        };
      }
      const organizationUser = await this.userCollection.findOne({
        type: "organization-user",
        email: { $eq: email },
      });
      if (!organizationUser || organizationUser.type !== "organization-user") {
        return {
          type: "error",
          errorCode: "not-found",
          errorMessage: "organization-user-not-found",
        };
      }
      return {
        type: "response",
        user: {
          username: user.username,
          email: user.email,
          name: user.name,
          lastname: user.lastName,
          permissions: organizationUser.permissions,
          password: user.password,
          organizationId: organizationUser.organizationId,
        },
      };
    } catch (error) {
      throw new RepositoryError("server-error", "server-error", error);
    }
  }
  public async findDriverByEmail(
    email: string
  ): Promise<FindDriverByEmailResponse> {
    try {
      const user = await this.userCollection.findOne({
        type: "driver",
        email: { $eq: email },
      });
      console.log(user, "420")
      if (!user || user.type !== "driver") {
        console.log("es aqui")
        return {
          type: "error",
          errorCode: "not-found",
          errorMessage: "driver-not-found",
        };
      }
      return {
        type: "response",
        driver: {
          username: user.username,
          email: user.email,
          name: user.name,
          lastname: user.lastName,
          password: user.password,
        },
      };
    } catch (error) {
      throw new RepositoryError("server-error", "server-error", error);
    }
  }

  // user drivers
  public async createDriver(
    req: CreateDriverRequest
  ): Promise<{ wasCreated: true } | undefined> {
    try {
      const exists = await this.userCollection.findOne(
        { type: "driver", username: { $eq: req.driver.username } },
        { collation: { locale: "en", strength: 3 } }
      );
      if (exists) {
        throw new RepositoryError("exists", "already-exists", 409);
      }

      const hashedPassword = await hashValue(
        req.driver.password,
      );
      const created = await this.userCollection.insertOne({
        type:"driver",
        email: req.driver.email,
        name: req.driver.name,
        lastName: req.driver.lastname,
        password: hashedPassword,
        username: req.driver.username,
      });
      if (created) {
        return { wasCreated: true };
      }
    } catch (error) {
      console.log(error);
      throw new RepositoryError("server-error", "server-error", error);
    }
  }
}

export default new UserRepository();
