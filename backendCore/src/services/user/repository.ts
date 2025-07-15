import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";
import { SALT_ROUNDS } from "../../constants/env";
import { UserModel, UserCollection } from "./models";
import { RepositoryError } from "../../utils/errors";
import {
  CreateDriverRequest,
  CreateUserRequest,
  CreateUserResponse,
  FindByEmailResponse,
  FindDriverByEmailResponse,
  ForgotPasswordRequest,
  ForgotPasswordResponse,
} from "./types";

import {  hashValue,  } from "../../shared/utils";
import { sendForgotPasswordEmail, sendWelcomeEmail } from "../task/nodemailer";
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

  // public async login(req: LoginRequest): Promise<LoginResponse> {
  //   try {
  //     const user = await this.userCollection.findOne({
  //       type: "user",
  //       email: { $eq: req.username },
  //     });
  //     if (!user) {
  //       return {
  //         type: "error",
  //         errorCode: "not-found",
  //         errorMessage: "user-not-found",
  //       };
  //     }

  //     const auth = await compareValue(req.password, user.password);
  //     if (!auth) {
  //       return {
  //         type: "error",
  //         errorCode: "forbidden",
  //         errorMessage: "username or password are invalid",
  //       };
  //     }

  //     const token = signToken(
  //       user.email,
  //       user.username,
  //       user.userType,
  //       user.organizationId
  //     );

  //     return { type: "response", token };
  //   } catch (error) {
  //     throw new RepositoryError("server-error", "server-error", error);
  //   }
  // }

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
          userType :"user",
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
      if (!user || user.type !== "driver") {
        return {
          type: "error",
          errorCode: "not-found",
          errorMessage: "driver-not-found",
        };
      }
      return {
        type: "response",
        driver: {
          userType:"driver",
          username: user.username,
          email: user.email,
          name: user.name,
          lastname: user.lastName,
          password: user.password,
          permissions: user.permissions,
        },
      };
    } catch (error) {
      throw new RepositoryError("server-error", "server-error", error);
    }
  }

  // user drivers
  public async createDriver(
    req: CreateDriverRequest
  ): Promise<CreateUserResponse> {
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
        permissions: ["driver"],
      });
      if (created.insertedId) {
        sendWelcomeEmail(req.driver.email,req.driver.username);
        return { type:"response", username: req.driver.username};
      }
      return {
      type: "error",
      errorCode: "server-error",
      errorMessage: "couldn't create driver",
    };
    } catch (error) {
      console.log(error);
      throw new RepositoryError("server-error", "server-error", error);
    }
  }

  public async forgotPassword(req: ForgotPasswordRequest): Promise<ForgotPasswordResponse>{
    try {
       const foundUser = await this.userCollection.findOne(
        { type: "driver", email: { $eq: req.email } },
        { collation: { locale: "en", strength: 3 } }
      );
      if(!foundUser?._id){
        return {
          type:"error",
          errorCode:"not-found",
          errorMessage:"user-not-found"
        }
      }
    //  const mail = await sendForgotPasswordEmail(foundUser.email,);

      return {
        type:"response",
        result:true,
      }
      
    } catch (error) {
      console.log(error);
      throw new RepositoryError("server-error", "server-error", error);
    }

  }
//   public async reserveParkingSpots(
// req:
//   ): Promise<{ wasCreated: true } | undefined>{

//   }
 }

export default new UserRepository();
