export class TokenUtil {
  static generateRandomToken(length: number = 32): string {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';
    for (let i = 0; i < length; i++) {
      token += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return token;
  }

  static generateUUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  static generateEmailVerificationToken(): string {
    return this.generateRandomToken(64);
  }

  static generatePasswordResetToken(): string {
    return this.generateRandomToken(64);
  }

  static generateRefreshTokenId(): string {
    return this.generateUUID();
  }

  static isTokenExpired(expiresAt: Date): boolean {
    return new Date() > expiresAt;
  }

  static getTokenExpiryTime(minutes: number): Date {
    const now = new Date();
    return new Date(now.getTime() + minutes * 60 * 1000);
  }

  static extractTokenFromHeader(authHeader?: string): string | null {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null;
    }
    return authHeader.substring(7);
  }
}
