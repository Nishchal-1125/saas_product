import { UserRole, Permission } from '../enums/user-role.enum';

export interface JwtPayload {
  sub: string; // user id
  email: string;
  role: UserRole;
  permissions: Permission[];
  iat?: number;
  exp?: number;
}

export interface RefreshTokenPayload {
  sub: string;
  tokenId: string;
  iat?: number;
  exp?: number;
}
