import { Strategy as LocalStrategy } from 'passport-local';
import UserRepository from "../../../services/user/repository"
import { compareValue } from "../../../shared/utils";

export const localStrategy = new LocalStrategy(
    { usernameField: 'email', passwordField: 'password' }, // Configuración personalizada
    async (email: string, password_check: string, done) => {
      try {
        const user = await UserRepository.findByEmail(email);
        if (user.type === 'error') {
          return done(user.errorCode, false);
        } else if (user.type === 'response') {
          const auth = await compareValue(password_check, user.user.password);
          if (!auth) {
            return done('forbidden', false);
          }
          const { password, ...safeUser } = user.user;
          return done(undefined,safeUser);
        }
      } catch (error) {
        return done(error, false);
      }
    }
  );


