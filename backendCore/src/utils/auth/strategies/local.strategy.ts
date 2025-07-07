import { Strategy as LocalStrategy } from "passport-local";
import UserRepository from "../../../services/user/repository";
import { compareValue } from "../../../shared/utils";

export const localStrategy = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true,
  },
  async (req, email: string, password_check: string, done) => {
    try {
      if (req.body?.userType === "organization-user") {
        const user = await UserRepository.findUserByEmail(email);
        if (user.type === "error") {
          return done(user.errorCode + " : " + user.errorMessage, false);
        } else if (user.type === "response") {
          const auth = await compareValue(password_check, user.user.password);
          if (!auth) {
            return done("forbidden", false);
          }
          const {
            password: _password,
            name: _name,
            lastname: _lastname,
            ...safeUser
          } = user.user;
          return done(undefined, safeUser);
        }
      } else if (req.body?.userType === "user-driver") {
        const driver = await UserRepository.findDriverByEmail(email);
        if (driver.type === "error") {
          return done(driver.errorCode + " : " + driver.errorMessage, false);
        } else if (driver.type === "response") {
          const auth = await compareValue(
            password_check,
            driver.driver.password
          );
          if (!auth) {
            return done("forbidden", false);
          }
          const {
            password: _password,
            name: _name,
            lastname: _lastname,
            ...safeUser
          } = driver.driver;
          return done(undefined, safeUser);
        }
      } else {
        console.error("INVALID OPTION");
      }
    } catch (error) {
      return done(error, false);
    }
  }
);
