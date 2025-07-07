import { Strategy, ExtractJwt, StrategyOptions } from "passport-jwt";
import { SECRET_KEY_JWT } from "../../../constants/env";
const options: StrategyOptions = {
  jwtFromRequest: (req) => {
    const token = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
    console.log("Extracted token in strategy:", token);
    return token;
  },
  secretOrKey: SECRET_KEY_JWT,
};


export const JwtStrategy = new Strategy(
  options,
  (payload: any, done: (_error: any, _user?: any) => void) => {
    return done(null, payload);
  }
);
