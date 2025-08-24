# Docker Setup Guide for E-commerce Platform

This guide will help you understand and run the entire e-commerce platform using Docker, even if you're new to Docker.

## What is Docker?

Docker is a tool that packages your application and all its dependencies into a "container" - think of it as a virtual box that contains everything needed to run your application. This ensures your application runs the same way on any computer.

## Prerequisites

1. **Install Docker Desktop**: Download from https://docker.com/products/docker-desktop
   - For Windows: Make sure WSL2 is enabled
   - For Mac: Download the Intel or Apple Silicon version
   - For Linux: Install Docker Engine

2. **Verify Installation**:
   ```powershell
   docker --version
   docker-compose --version
   ```

## Understanding Our Docker Setup

Our e-commerce platform consists of multiple services:

### Infrastructure Services (Databases & Tools)
- **PostgreSQL**: Main database for user accounts, orders, payments
- **MongoDB**: Document database for products, cart items
- **Redis**: Fast cache for sessions and temporary data
- **RabbitMQ**: Message queue for communication between services
- **Nginx**: Web server that routes requests to the right service

### Application Services
- **API Gateway**: Main entry point that routes requests
- **Auth Service**: Handles user login, registration, and security
- **User Service**: Manages user profiles and data
- **Catalog Service**: Manages products and categories
- **Cart Service**: Handles shopping cart functionality
- **Order Service**: Processes orders and order history
- **Payment Service**: Handles payments and transactions
- **Notification Service**: Sends emails and notifications
- **WebSocket Gateway**: Enables real-time features
- **Frontend**: The website users interact with

## Running the Platform

### Step 1: Clone and Navigate
```powershell
# Navigate to your project directory
cd "C:\Users\Rakesh Baluni\Desktop\saas_product"
```

### Step 2: Environment Variables
Create a `.env` file in the root directory:
```bash
# JWT Secrets (change these in production!)
JWT_SECRET=your-super-secret-jwt-key-change-me
JWT_REFRESH_SECRET=your-super-secret-refresh-key-change-me

# Stripe Payment Keys (get from Stripe dashboard)
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key

# Database passwords (change in production!)
POSTGRES_PASSWORD=secure_postgres_password
MONGODB_PASSWORD=secure_mongodb_password
REDIS_PASSWORD=secure_redis_password
RABBITMQ_PASSWORD=secure_rabbitmq_password

# Email configuration (optional for development)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

### Step 3: Start Everything
```powershell
# Start all services (this will take a few minutes the first time)
docker-compose up -d

# Check if everything is running
docker-compose ps
```

### Step 4: Access Your Application

Once everything is running, you can access:

- **Main Website**: http://localhost (frontend application)
- **API Gateway**: http://localhost/api (all API endpoints)
- **Admin Panel**: http://admin.localhost
- **Database Admin**: 
  - RabbitMQ Management: http://localhost:15672 (admin/password)
  - MailHog (Email testing): http://localhost:8025

## Understanding the Logs

To see what's happening in your services:

```powershell
# View logs for all services
docker-compose logs

# View logs for a specific service
docker-compose logs auth-svc

# Follow logs in real-time
docker-compose logs -f api-gateway
```

## Common Docker Commands

### Starting and Stopping
```powershell
# Start all services in background
docker-compose up -d

# Start specific services
docker-compose up -d postgres redis

# Stop all services
docker-compose down

# Stop and remove all data (be careful!)
docker-compose down -v
```

### Monitoring
```powershell
# See running containers
docker-compose ps

# See resource usage
docker stats

# Execute commands inside a container
docker-compose exec postgres psql -U postgres -d ecommerce
```

### Rebuilding After Code Changes
```powershell
# Rebuild and restart a specific service
docker-compose build auth-svc
docker-compose up -d auth-svc

# Rebuild everything
docker-compose build
docker-compose up -d
```

## Development Workflow

### 1. Making Code Changes
When you modify code in any service:
```powershell
# Rebuild the affected service
docker-compose build service-name
docker-compose up -d service-name
```

### 2. Database Changes
If you modify database schemas:
```powershell
# Restart database services
docker-compose restart postgres mongodb
```

### 3. Adding New Dependencies
If you add new npm packages:
```powershell
# Rebuild the service completely
docker-compose build --no-cache service-name
docker-compose up -d service-name
```

## Troubleshooting

### Common Issues

1. **Port Already in Use**:
   ```powershell
   # Stop other applications using the same ports
   # Or change ports in docker-compose.yml
   ```

2. **Service Won't Start**:
   ```powershell
   # Check logs
   docker-compose logs service-name
   
   # Restart service
   docker-compose restart service-name
   ```

3. **Database Connection Issues**:
   ```powershell
   # Check if database is running
   docker-compose ps postgres
   
   # Restart database
   docker-compose restart postgres
   ```

4. **Out of Disk Space**:
   ```powershell
   # Clean up unused Docker data
   docker system prune
   
   # Remove unused volumes (be careful!)
   docker volume prune
   ```

### Viewing Service Health
```powershell
# Check health of all services
docker-compose ps

# Get detailed info about a service
docker inspect container-name
```

## Production Deployment

For production, you'll need to:

1. **Secure Your Environment Variables**:
   - Use strong, unique passwords
   - Use real SSL certificates
   - Configure proper email settings

2. **Scale Services**:
   ```yaml
   # In docker-compose.yml, add replicas
   deploy:
     replicas: 3
   ```

3. **Monitor Your Application**:
   - Set up log aggregation
   - Monitor resource usage
   - Set up alerts

## Architecture Overview

```
Internet → Nginx → API Gateway → Individual Services
                               ↘ Database Services
                               ↘ Message Queue
                               ↘ Cache (Redis)
```

## Next Steps

1. **Learn Docker Basics**: https://docs.docker.com/get-started/
2. **Understand Docker Compose**: https://docs.docker.com/compose/
3. **Monitor Your Services**: Set up logging and monitoring
4. **Security**: Implement proper security measures for production

Remember: Docker containers are isolated environments. Each service runs in its own container and communicates with others through the network we've defined.
