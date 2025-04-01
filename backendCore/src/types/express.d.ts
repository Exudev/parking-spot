import { JwtPayload } from 'jsonwebtoken';

export type AccountOrganizationToken = {
    username: string;
    permission: string;
    organizationId: string;
};

declare global {
  namespace Express {
    interface User {
      email: string;
      username: string;
      role: string;
    }

    interface Request {
      account?: AccountOrganizationToken & JwtPayload;
    }
  }
}

export {};
