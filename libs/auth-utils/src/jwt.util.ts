export interface JwtPayload {
  sub: string;
  email: string;
  role: string;
  permissions: string[];
  iat?: number;
  exp?: number;
}

export interface RefreshTokenPayload {
  sub: string;
  tokenId: string;
  iat?: number;
  exp?: number;
}

export class JwtUtil {
  private static accessTokenSecret = 'access-secret';
  private static refreshTokenSecret = 'refresh-secret';
  private static accessTokenExpiry = '15m';
  private static refreshTokenExpiry = '7d';

  static generateAccessToken(payload: Omit<JwtPayload, 'iat' | 'exp'>): string {
    // Implementation will be added when jsonwebtoken is available
    return `access-token-${payload.sub}`;
  }

  static generateRefreshToken(payload: Omit<RefreshTokenPayload, 'iat' | 'exp'>): string {
    // Implementation will be added when jsonwebtoken is available
    return `refresh-token-${payload.sub}`;
  }

  static verifyAccessToken(token: string): JwtPayload {
    // Implementation will be added when jsonwebtoken is available
    throw new Error('Invalid access token');
  }

  static verifyRefreshToken(token: string): RefreshTokenPayload {
    // Implementation will be added when jsonwebtoken is available
    throw new Error('Invalid refresh token');
  }

  static decodeToken(token: string): any {
    // Implementation will be added when jsonwebtoken is available
    return null;
  }

  static getTokenExpiry(token: string): Date | null {
    // Implementation will be added when jsonwebtoken is available
    return null;
  }
}
