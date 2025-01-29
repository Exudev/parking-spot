import passport from "passport";
import { localStrategy } from "./strategies/local.strategy";
import { JwtStrategy } from "./strategies/jwt.strategy";
passport.use('local',localStrategy);
passport.use('jwt',JwtStrategy);