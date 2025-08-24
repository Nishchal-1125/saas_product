# Development Guide

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js 20+** - [Download](https://nodejs.org/)
- **Docker & Docker Compose** - [Download](https://www.docker.com/)
- **Git** - [Download](https://git-scm.com/)
- **VS Code** (recommended) - [Download](https://code.visualstudio.com/)

## Initial Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd saas_product
```

### 2. Environment Configuration

Copy the environment example file:

```bash
cp .env.example .env
```

Edit the `.env` file with your local configuration:

```env
# Database URLs
POSTGRES_URL=postgresql://postgres:password@localhost:5432/ecommerce
MONGODB_URL=mongodb://localhost:27017/ecommerce
REDIS_URL=redis://localhost:6379

# JWT Secrets (Change these in production!)
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_REFRESH_SECRET=your-super-secret-refresh-key-change-in-production

# Service Ports
API_GATEWAY_PORT=3000
AUTH_SERVICE_PORT=3001
# ... other configurations
```

### 3. Install Dependencies

```bash
# Install root dependencies
npm install

# Install all workspace dependencies
npm run setup
```

## Running the Application

### Option 1: Full Docker Setup (Recommended)

Start all services with Docker Compose:

```bash
# Start databases and infrastructure
docker compose up -d postgres mongodb redis rabbitmq

# Start all microservices
docker compose up -d

# Check service status
docker compose ps

# View logs
docker compose logs -f api-gateway
docker compose logs -f auth-svc
```

### Option 2: Hybrid Development

Start infrastructure with Docker and services locally:

```bash
# Start databases only
docker compose up -d postgres mongodb redis rabbitmq

# Start services locally (in separate terminals)
cd services/auth-svc && npm run dev
cd services/api-gateway && npm run dev
cd services/user-svc && npm run dev
# ... other services

# Start frontend
cd ecommerce-frontend && npm run dev
```

### Option 3: Full Local Development

If you prefer to run databases locally:

1. Install PostgreSQL, MongoDB, and Redis locally
2. Update connection strings in `.env`
3. Run services as described in Option 2

## Service Development

### Creating a New Microservice

1. **Create Service Directory**
   ```bash
   mkdir services/new-service
   cd services/new-service
   ```

2. **Initialize Package**
   ```bash
   npm init -y
   # Edit package.json with service-specific details
   ```

3. **Install Dependencies**
   ```bash
   npm install @nestjs/common @nestjs/core @nestjs/platform-express
   npm install --save-dev @nestjs/cli typescript
   ```

4. **Create Basic Structure**
   ```
   services/new-service/
   ├── src/
   │   ├── main.ts
   │   ├── app.module.ts
   │   ├── app.controller.ts
   │   └── app.service.ts
   ├── Dockerfile
   ├── package.json
   └── tsconfig.json
   ```

### Service Development Guidelines

#### 1. File Structure
```
services/service-name/
├── src/
│   ├── main.ts                 # Application entry point
│   ├── app.module.ts          # Root module
│   ├── controllers/           # REST controllers
│   ├── services/              # Business logic
│   ├── entities/              # Database entities
│   ├── dto/                   # Data transfer objects
│   ├── guards/                # Authentication guards
│   ├── interceptors/          # Request/response interceptors
│   ├── pipes/                 # Validation pipes
│   └── utils/                 # Utility functions
├── test/                      # Unit and integration tests
├── Dockerfile                 # Container definition
├── package.json               # Dependencies and scripts
└── tsconfig.json             # TypeScript configuration
```

#### 2. Controller Example
```typescript
import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/guards/jwt-auth.guard';
import { ServiceName } from './service-name.service';
import { CreateDto, UpdateDto } from './dto';

@ApiTags('Service Name')
@Controller('service-name')
export class ServiceNameController {
  constructor(private readonly serviceNameService: ServiceName) {}

  @Get()
  @ApiOperation({ summary: 'Get all items' })
  @ApiResponse({ status: 200, description: 'Items retrieved successfully' })
  async findAll() {
    return this.serviceNameService.findAll();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create new item' })
  @ApiResponse({ status: 201, description: 'Item created successfully' })
  async create(@Body() createDto: CreateDto) {
    return this.serviceNameService.create(createDto);
  }
}
```

#### 3. Service Example
```typescript
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Entity } from './entities/entity.entity';
import { CreateDto, UpdateDto } from './dto';

@Injectable()
export class ServiceNameService {
  constructor(
    @InjectRepository(Entity)
    private entityRepository: Repository<Entity>,
  ) {}

  async findAll(): Promise<Entity[]> {
    return this.entityRepository.find();
  }

  async findOne(id: string): Promise<Entity> {
    const entity = await this.entityRepository.findOne({ where: { id } });
    if (!entity) {
      throw new NotFoundException(`Entity with ID ${id} not found`);
    }
    return entity;
  }

  async create(createDto: CreateDto): Promise<Entity> {
    const entity = this.entityRepository.create(createDto);
    return this.entityRepository.save(entity);
  }
}
```

## Frontend Development

### Component Structure

```
ecommerce-frontend/src/
├── app/                       # Next.js app directory
│   ├── (auth)/               # Route groups
│   ├── products/             # Product pages
│   ├── cart/                 # Cart pages
│   └── layout.tsx            # Root layout
├── components/               # Reusable components
│   ├── ui/                   # Basic UI components
│   ├── forms/                # Form components
│   └── layout/               # Layout components
├── modules/                  # Feature modules
│   ├── auth/                 # Authentication module
│   ├── products/             # Product module
│   └── cart/                 # Cart module
├── hooks/                    # Custom React hooks
├── services/                 # API services
├── store/                    # State management
├── utils/                    # Utility functions
└── types/                    # TypeScript types
```

### Creating Components

1. **UI Component Example**
   ```tsx
   // components/ui/Button.tsx
   import { forwardRef } from 'react';
   import { cn } from '@/utils/cn';

   interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
     variant?: 'primary' | 'secondary' | 'outline';
     size?: 'sm' | 'md' | 'lg';
   }

   export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
     ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
       return (
         <button
           className={cn(
             'btn',
             `btn-${variant}`,
             `btn-${size}`,
             className
           )}
           ref={ref}
           {...props}
         />
       );
     }
   );
   ```

2. **Feature Module Example**
   ```tsx
   // modules/auth/LoginForm.tsx
   import { useState } from 'react';
   import { useForm } from 'react-hook-form';
   import { Button } from '@/components/ui/Button';
   import { Input } from '@/components/ui/Input';
   import { useAuth } from '@/hooks/useAuth';

   interface LoginFormData {
     email: string;
     password: string;
   }

   export function LoginForm() {
     const { login, isLoading } = useAuth();
     const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();

     const onSubmit = async (data: LoginFormData) => {
       try {
         await login(data);
       } catch (error) {
         console.error('Login failed:', error);
       }
     };

     return (
       <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
         <Input
           type="email"
           placeholder="Email"
           {...register('email', { required: 'Email is required' })}
           error={errors.email?.message}
         />
         <Input
           type="password"
           placeholder="Password"
           {...register('password', { required: 'Password is required' })}
           error={errors.password?.message}
         />
         <Button type="submit" disabled={isLoading} className="w-full">
           {isLoading ? 'Signing in...' : 'Sign In'}
         </Button>
       </form>
     );
   }
   ```

## Database Management

### Running Migrations

```bash
# Generate migration
npm run migration:generate --workspace=services/auth-svc -- CreateUsersTable

# Run migrations
npm run migration:run --workspace=services/auth-svc

# Revert migration
npm run migration:revert --workspace=services/auth-svc
```

### Seeding Data

```bash
# Run seeders
npm run seed --workspace=services/auth-svc

# Custom seed script
npm run seed:products --workspace=services/catalog-svc
```

## Testing

### Unit Tests

```bash
# Run tests for specific service
npm run test --workspace=services/auth-svc

# Run tests with coverage
npm run test:cov --workspace=services/auth-svc

# Run tests in watch mode
npm run test:watch --workspace=services/auth-svc
```

### Integration Tests

```bash
# Run e2e tests
npm run test:e2e --workspace=services/auth-svc

# Run all tests
npm run test:all
```

### Test Example

```typescript
// auth-svc/src/auth.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

describe('AuthService', () => {
  let service: AuthService;
  let jwtService: JwtService;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
            verify: jest.fn(),
          },
        },
        {
          provide: UserService,
          useValue: {
            findByEmail: jest.fn(),
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('login', () => {
    it('should return access token for valid credentials', async () => {
      const mockUser = { id: '1', email: 'test@example.com', password: 'hashedPassword' };
      jest.spyOn(userService, 'findByEmail').mockResolvedValue(mockUser);
      jest.spyOn(jwtService, 'sign').mockReturnValue('mock-token');

      const result = await service.login('test@example.com', 'password');

      expect(result).toHaveProperty('accessToken');
      expect(result.accessToken).toBe('mock-token');
    });
  });
});
```

## Debugging

### VS Code Configuration

Create `.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug Auth Service",
      "type": "node",
      "request": "launch",
      "program": "${workspaceFolder}/services/auth-svc/src/main.ts",
      "outFiles": ["${workspaceFolder}/services/auth-svc/dist/**/*.js"],
      "env": {
        "NODE_ENV": "development"
      },
      "runtimeArgs": ["-r", "ts-node/register"],
      "skipFiles": ["<node_internals>/**"]
    }
  ]
}
```

### Docker Debugging

```bash
# View service logs
docker compose logs -f service-name

# Execute commands in running container
docker compose exec service-name sh

# View container resource usage
docker stats

# Inspect container
docker compose exec service-name cat /etc/hosts
```

## Performance Optimization

### Backend Optimization

1. **Database Optimization**
   - Use proper indexes
   - Implement query pagination
   - Use connection pooling
   - Cache frequently accessed data

2. **API Optimization**
   - Implement response compression
   - Use HTTP caching headers
   - Implement request rate limiting
   - Optimize payload sizes

### Frontend Optimization

1. **Code Splitting**
   ```tsx
   // Lazy load components
   const ProductDetails = lazy(() => import('./ProductDetails'));
   
   // Use Suspense
   <Suspense fallback={<LoadingSpinner />}>
     <ProductDetails />
   </Suspense>
   ```

2. **Image Optimization**
   ```tsx
   import Image from 'next/image';
   
   <Image
     src="/product.jpg"
     alt="Product"
     width={400}
     height={300}
     priority={false}
     loading="lazy"
   />
   ```

## Troubleshooting

### Common Issues

1. **Port Already in Use**
   ```bash
   # Kill process using port
   npx kill-port 3000
   
   # Or use different port
   PORT=3001 npm run dev
   ```

2. **Database Connection Issues**
   ```bash
   # Check if containers are running
   docker compose ps
   
   # Restart database services
   docker compose restart postgres mongodb redis
   ```

3. **Memory Issues**
   ```bash
   # Increase Node.js memory limit
   NODE_OPTIONS="--max-old-space-size=4096" npm run dev
   ```

### Logs and Monitoring

```bash
# View all service logs
docker compose logs -f

# View specific service logs
docker compose logs -f auth-svc

# Follow logs with timestamps
docker compose logs -f -t auth-svc

# View last N lines
docker compose logs --tail=100 auth-svc
```

## Code Quality

### Linting and Formatting

```bash
# Lint all code
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format

# Type check
npm run type-check
```

### Pre-commit Hooks

Install Husky for git hooks:

```bash
npm install --save-dev husky lint-staged

# Add to package.json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "*.{ts,tsx,js,jsx}": [
      "eslint --fix",
      "prettier --write"
    ]
  }
}
```

## Deployment Preparation

### Environment-specific Configurations

1. **Development** (`.env.development`)
2. **Testing** (`.env.test`)
3. **Staging** (`.env.staging`)
4. **Production** (`.env.production`)

### Build for Production

```bash
# Build all services
npm run build

# Build specific service
npm run build --workspace=services/auth-svc

# Build frontend
npm run build --workspace=ecommerce-frontend
```

### Docker Production Build

```bash
# Build production images
docker compose -f docker-compose.prod.yml build

# Run production stack
docker compose -f docker-compose.prod.yml up -d
```

This guide covers the essential aspects of developing with the e-commerce microservices platform. For specific service documentation, refer to the individual README files in each service directory.
