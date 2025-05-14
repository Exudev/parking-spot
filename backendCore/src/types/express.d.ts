import { JwtPayload } from 'jsonwebtoken';
export type PermissionType = "admin"|"moderator"|"viewer";
export type AccountOrganizationToken = {
    username: string;
    permissions: PermissionType[];
    organizationId: string;
};

declare global {
  namespace Express {
    interface User {
      email: string;
      username: string;
      permissions: PermissionType[];
    }

    interface Request {
      account?: AccountOrganizationToken & JwtPayload;
    }
  }
}

export {};
