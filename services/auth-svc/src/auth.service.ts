import { Injectable, UnauthorizedException, ConflictException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

// Mock user database - In production, this would be a real database
const mockUsers = [
  {
    id: 'superadmin-1',
    email: 'superadmin@demo.com',
    password: '$2a$10$fHHsQb2d4Y5zrDGwihbeuuF1UypqjK3Q6A1nwYvV5PYJnoaAS5yuW', // password123
    firstName: 'Super',
    lastName: 'Admin',
    role: 'SUPERADMIN',
    permissions: ['*'],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'admin-1',
    email: 'admin@demo.com',
    password: '$2a$10$fHHsQb2d4Y5zrDGwihbeuuF1UypqjK3Q6A1nwYvV5PYJnoaAS5yuW', // password123
    firstName: 'Admin',
    lastName: 'User',
    role: 'ADMIN',
    permissions: ['USER_READ', 'USER_UPDATE', 'PRODUCT_CREATE', 'PRODUCT_READ', 'PRODUCT_UPDATE', 'PRODUCT_DELETE', 'ORDER_READ', 'ORDER_UPDATE', 'PAYMENT_READ'],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'seller-1',
    email: 'seller@demo.com',
    password: '$2a$10$fHHsQb2d4Y5zrDGwihbeuuF1UypqjK3Q6A1nwYvV5PYJnoaAS5yuW', // password123
    firstName: 'Seller',
    lastName: 'User',
    role: 'SELLER',
    permissions: ['PRODUCT_CREATE', 'PRODUCT_READ', 'PRODUCT_UPDATE', 'ORDER_READ', 'ORDER_UPDATE'],
    isActive: true,
    businessName: 'Seller Business',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'customer-1',
    email: 'customer@demo.com',
    password: '$2a$10$fHHsQb2d4Y5zrDGwihbeuuF1UypqjK3Q6A1nwYvV5PYJnoaAS5yuW', // password123
    firstName: 'Customer',
    lastName: 'User',
    role: 'CUSTOMER',
    permissions: ['PRODUCT_READ', 'ORDER_CREATE', 'ORDER_READ', 'PAYMENT_CREATE'],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  }
];

// Mock refresh token storage
const refreshTokens = new Set<string>();

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async register(registerDto: any) {
    try {
      // Check if user already exists
      const existingUser = mockUsers.find(user => user.email === registerDto.email);
      if (existingUser) {
        throw new ConflictException('User with this email already exists');
      }

      // Validate required fields
      if (!registerDto.email || !registerDto.password || !registerDto.firstName || !registerDto.lastName) {
        throw new BadRequestException('Missing required fields');
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(registerDto.password, 10);

      // Set default role and permissions
      const role = registerDto.role || 'CUSTOMER';
      let permissions = [];
      
      switch (role) {
        case 'CUSTOMER':
          permissions = ['PRODUCT_READ', 'ORDER_CREATE', 'ORDER_READ', 'PAYMENT_CREATE'];
          break;
        case 'SELLER':
          permissions = ['PRODUCT_CREATE', 'PRODUCT_READ', 'PRODUCT_UPDATE', 'ORDER_READ', 'ORDER_UPDATE'];
          break;
        default:
          permissions = ['PRODUCT_READ', 'ORDER_CREATE', 'ORDER_READ', 'PAYMENT_CREATE'];
      }

      // Create new user
      const newUser = {
        id: `user-${Date.now()}`,
        email: registerDto.email,
        password: hashedPassword,
        firstName: registerDto.firstName,
        lastName: registerDto.lastName,
        role: role,
        permissions: permissions,
        isActive: true,
        businessName: registerDto.businessName || null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // Add to mock database
      mockUsers.push(newUser);

      // Return user without password
      const { password, ...userWithoutPassword } = newUser;

      return {
        success: true,
        message: 'User registered successfully',
        data: userWithoutPassword,
      };
    } catch (error) {
      throw error;
    }
  }

  async login(loginDto: any) {
    try {
      // Validate input
      if (!loginDto.email || !loginDto.password) {
        throw new BadRequestException('Email and password are required');
      }

      // Find user
      const user = mockUsers.find(u => u.email === loginDto.email);
      if (!user) {
        throw new UnauthorizedException('Invalid credentials');
      }

      // Check if user is active
      if (!user.isActive) {
        throw new UnauthorizedException('Account is deactivated');
      }

      // Verify password
      const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid credentials');
      }

      // Generate tokens
      const payload = { 
        sub: user.id, 
        email: user.email, 
        role: user.role,
        permissions: user.permissions
      };

      const accessToken = this.jwtService.sign(payload, { expiresIn: '15m' });
      const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

      // Store refresh token
      refreshTokens.add(refreshToken);

      // Return user without password
      const { password, ...userWithoutPassword } = user;

      return {
        success: true,
        message: 'Login successful',
        data: {
          user: userWithoutPassword,
          tokens: {
            accessToken,
            refreshToken,
            expiresIn: 900, // 15 minutes in seconds
          },
        },
      };
    } catch (error) {
      throw error;
    }
  }

  async refresh(refreshDto: any) {
    try {
      if (!refreshDto.refreshToken) {
        throw new BadRequestException('Refresh token is required');
      }

      // Check if refresh token exists in storage
      if (!refreshTokens.has(refreshDto.refreshToken)) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      // Verify refresh token
      let payload;
      try {
        payload = this.jwtService.verify(refreshDto.refreshToken);
      } catch (error) {
        refreshTokens.delete(refreshDto.refreshToken);
        throw new UnauthorizedException('Invalid refresh token');
      }

      // Find user
      const user = mockUsers.find(u => u.id === payload.sub);
      if (!user || !user.isActive) {
        refreshTokens.delete(refreshDto.refreshToken);
        throw new UnauthorizedException('User not found or inactive');
      }

      // Generate new tokens
      const newPayload = { 
        sub: user.id, 
        email: user.email, 
        role: user.role,
        permissions: user.permissions
      };

      const newAccessToken = this.jwtService.sign(newPayload, { expiresIn: '15m' });
      const newRefreshToken = this.jwtService.sign(newPayload, { expiresIn: '7d' });

      // Remove old refresh token and add new one
      refreshTokens.delete(refreshDto.refreshToken);
      refreshTokens.add(newRefreshToken);

      return {
        success: true,
        message: 'Token refreshed successfully',
        data: {
          accessToken: newAccessToken,
          refreshToken: newRefreshToken,
          expiresIn: 900,
        },
      };
    } catch (error) {
      throw error;
    }
  }

  async logout(logoutDto: any) {
    try {
      if (logoutDto.refreshToken) {
        refreshTokens.delete(logoutDto.refreshToken);
      }

      return {
        success: true,
        message: 'Logout successful',
      };
    } catch (error) {
      return {
        success: true,
        message: 'Logout successful',
      };
    }
  }

  async verify(token: string) {
    try {
      const payload = this.jwtService.verify(token);
      const user = mockUsers.find(u => u.id === payload.sub);
      
      if (!user || !user.isActive) {
        throw new UnauthorizedException('User not found or inactive');
      }

      const { password, ...userWithoutPassword } = user;

      return {
        success: true,
        message: 'Token is valid',
        data: {
          user: userWithoutPassword,
        },
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
