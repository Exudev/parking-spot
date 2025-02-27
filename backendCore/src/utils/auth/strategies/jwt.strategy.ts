import { Strategy, ExtractJwt, StrategyOptions } from 'passport-jwt';
import { SECRET_KEY_JWT } from "../../../constants/env";
const options: StrategyOptions = {
  
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

  secretOrKey: SECRET_KEY_JWT,
};


export const JwtStrategy = new Strategy(options, (payload: any, done: (error: any, user?: any) => void) => {
  return done(null, payload);
});

