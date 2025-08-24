# ECommerce Microservices Architecture

## Overview

This project implements a production-ready microservices architecture for an e-commerce platform. The system is designed to be scalable, maintainable, and easily deployable both locally and in the cloud.

## Architecture Components

### Backend Services

1. **API Gateway** (Port 3000)
   - Central entry point for all client requests
   - JWT token validation
   - Rate limiting and security
   - Request routing to appropriate microservices
   - API documentation aggregation

2. **Auth Service** (Port 3001)
   - User authentication and authorization
   - JWT token generation and validation
   - Role-based access control (RBAC)
   - Password management
   - Refresh token handling

3. **User Service** (Port 3002)
   - User profile management
   - Address management
   - User preferences
   - Account settings

4. **Catalog Service** (Port 3003)
   - Product management
   - Category management
   - Product search and filtering
   - Inventory tracking

5. **Cart Service** (Port 3004)
   - Shopping cart operations
   - Cart persistence
   - Stock reservation
   - Cart expiration

6. **Order Service** (Port 3005)
   - Order creation and management
   - Order status tracking
   - Order history
   - Integration with payment service

7. **Payment Service** (Port 3006)
   - Payment processing
   - Payment method management
   - Transaction history
   - Refund handling

8. **Notification Service** (Port 3007)
   - Email notifications
   - SMS notifications
   - Push notifications
   - Notification templates

9. **WebSocket Gateway** (Port 3008)
   - Real-time communication
   - Live updates for orders
   - Stock notifications
   - Chat support

### Frontend Application

**Next.js Frontend** (Port 3010)
- Modern React-based frontend
- Server-side rendering (SSR)
- Static site generation (SSG)
- Responsive design with Tailwind CSS
- Real-time updates via WebSocket
- Progressive Web App (PWA) capabilities

### Databases

1. **PostgreSQL**
   - Transactional data (users, orders, payments)
   - ACID compliance for critical operations
   - Advanced querying capabilities

2. **MongoDB**
   - Product catalog and flexible documents
   - Cart data and session information
   - Content management

3. **Redis**
   - Caching layer
   - Session storage
   - Real-time pub/sub messaging
   - Rate limiting data

### Infrastructure

1. **Docker Compose**
   - Local development environment
   - Service orchestration
   - Volume management
   - Network configuration

2. **Message Queue (RabbitMQ)**
   - Asynchronous communication
   - Event-driven architecture
   - Background job processing
   - Service decoupling

## Technology Stack

### Backend
- **Node.js 20+** - Runtime environment
- **NestJS** - Application framework
- **TypeScript** - Type safety
- **TypeORM** - Database ORM
- **Passport.js** - Authentication middleware
- **Socket.IO** - Real-time communication
- **Redis** - Caching and sessions
- **RabbitMQ** - Message queuing

### Frontend
- **Next.js 14+** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Zustand** - State management
- **React Query** - Data fetching
- **Socket.IO Client** - Real-time updates
- **React Hook Form** - Form handling

### DevOps & Tools
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Swagger/OpenAPI** - API documentation

## Key Features

### Authentication & Authorization
- JWT-based authentication
- Role-based access control (SUPERADMIN, ADMIN, SELLER, CUSTOMER)
- Refresh token rotation
- Session management
- Permission-based resource access

### Scalability
- Horizontal scaling support
- Load balancing ready
- Database connection pooling
- Redis clustering support
- Microservice isolation

### Real-time Features
- Live order tracking
- Stock level updates
- Real-time notifications
- WebSocket clustering with Redis adapter

### Performance
- Database query optimization
- Redis caching strategy
- Image optimization
- Code splitting and lazy loading
- CDN ready

### Security
- Input validation and sanitization
- SQL injection prevention
- XSS protection
- Rate limiting
- CORS configuration
- Helmet.js security headers

## Development Workflow

1. **Local Development**
   ```bash
   # Start all services
   docker compose up -d
   
   # Start frontend
   cd ecommerce-frontend
   npm run dev
   ```

2. **API Documentation**
   - API Gateway: http://localhost:3000/docs
   - Auth Service: http://localhost:3001/docs
   - Each service has its own Swagger documentation

3. **Database Management**
   - PostgreSQL: localhost:5432
   - MongoDB: localhost:27017
   - Redis: localhost:6379

4. **Monitoring**
   - MailHog (Email testing): http://localhost:8025
   - RabbitMQ Management: http://localhost:15672

## Deployment Strategy

### Development
- Docker Compose for local development
- Hot reloading for rapid development
- Shared volumes for code changes

### Production
- Container orchestration (Kubernetes/Docker Swarm)
- Separate database instances
- Load balancers
- SSL termination
- Environment-based configuration

## API Endpoints

### Authentication
- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `POST /auth/refresh` - Token refresh
- `POST /auth/logout` - User logout

### Products
- `GET /products` - List products
- `GET /products/:id` - Get product details
- `POST /products` - Create product (Admin/Seller)
- `PUT /products/:id` - Update product (Admin/Seller)

### Cart
- `GET /cart` - Get user cart
- `POST /cart/items` - Add item to cart
- `PUT /cart/items/:id` - Update cart item
- `DELETE /cart/items/:id` - Remove item from cart

### Orders
- `GET /orders` - List user orders
- `POST /orders` - Create new order
- `GET /orders/:id` - Get order details
- `PUT /orders/:id/status` - Update order status (Admin)

### Payments
- `POST /payments/intent` - Create payment intent
- `POST /payments/confirm` - Confirm payment
- `GET /payments/history` - Payment history

## Data Models

### User
```typescript
interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  isActive: boolean;
  isEmailVerified: boolean;
  addresses: Address[];
  createdAt: Date;
  updatedAt: Date;
}
```

### Product
```typescript
interface Product {
  id: string;
  name: string;
  description: string;
  sku: string;
  price: number;
  quantity: number;
  categories: Category[];
  images: ProductImage[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

### Order
```typescript
interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  status: OrderStatus;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  shippingAddress: Address;
  billingAddress: Address;
  createdAt: Date;
  updatedAt: Date;
}
```

## Environment Variables

```env
# Database Configuration
POSTGRES_URL=postgresql://user:pass@localhost:5432/ecommerce
MONGODB_URL=mongodb://localhost:27017/ecommerce
REDIS_URL=redis://localhost:6379

# JWT Configuration
JWT_SECRET=your-secret-key
JWT_REFRESH_SECRET=your-refresh-secret
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# Service Ports
API_GATEWAY_PORT=3000
AUTH_SERVICE_PORT=3001
USER_SERVICE_PORT=3002
# ... other service ports

# External Services
STRIPE_SECRET_KEY=sk_test_...
SMTP_HOST=localhost
SMTP_PORT=1025
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Update documentation
6. Submit a pull request

## License

MIT License - see LICENSE file for details
