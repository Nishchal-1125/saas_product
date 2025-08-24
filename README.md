# 🚀 E-Commerce Microservices Platform

A production-ready, scalable e-commerce platform built with microservices architecture using NestJS, Next.js, and modern technologies.

## 🏗️ Architecture Overview

### Backend Services (NestJS)
- **API Gateway** (Port 3000) - Central routing and authentication
- **Auth Service** (Port 3001) - JWT authentication and RBAC
- **User Service** (Port 3002) - User profile management
- **Catalog Service** (Port 3003) - Product catalog and categories
- **Cart Service** (Port 3004) - Shopping cart operations
- **Order Service** (Port 3005) - Order management and checkout
- **Payment Service** (Port 3006) - Payment processing
- **Notification Service** (Port 3007) - Email/SMS notifications
- **WebSocket Gateway** (Port 3008) - Real-time updates

### Frontend (Next.js)
- **E-Commerce Frontend** (Port 3010) - Customer-facing application

### Infrastructure
- **PostgreSQL** (Port 5432) - Primary database
- **Redis** (Port 6379) - Caching and sessions
- **MongoDB** (Port 27017) - Document storage
- **Nginx** (Port 80) - Reverse proxy and load balancer

## 🚀 Quick Start

### Prerequisites
- **Node.js** >= 20.0.0
- **Docker Desktop** (running)
- **Git**
- **PowerShell** (Windows) or **Bash** (Linux/Mac)

### 1. Clone and Setup
```bash
git clone <repository-url>
cd ecommerce-microservices
```

### 2. Start All Services (Windows)
```powershell
# Start everything with one command
.\start-all.ps1

# Or with options
.\start-all.ps1 -Mode dev -WatchLogs

# Clean start (removes all data)
.\start-all.ps1 -Clean
```

### 3. Access the Application

#### 🌐 Main URLs
- **Frontend**: http://localhost:3010
- **Main Site (via Nginx)**: http://localhost
- **API Gateway**: http://localhost:3000
- **API Documentation**: http://localhost:3000/docs

#### 🔐 Demo Accounts
```
👑 Superadmin:  superadmin@demo.com / password123
👨‍💼 Admin:       admin@demo.com / password123  
🏪 Seller:      seller@demo.com / password123
👤 Customer:    customer@demo.com / password123
```

## 🛠️ Management Commands

### Windows PowerShell
```powershell
# Start all services
.\start-all.ps1

# Stop all services
.\stop-all.ps1

# View logs
.\logs.ps1

# Clean restart (removes all data)
.\start-all.ps1 -Clean
```
- **Containerization**: Docker & Docker Compose
- **Authentication**: JWT with RBAC (SUPERADMIN, ADMIN, SELLER, CUSTOMER)

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- Docker & Docker Compose
- Git

### Local Development

```bash
# Clone and install dependencies
git clone <repo-url>
cd saas_product
npm install

# Start all services
docker compose up -d --build

# Start frontend
cd ecommerce-frontend
npm run dev
```

## 📁 Project Structure

```
saas_product/
├── services/           # Backend microservices
├── ecommerce-frontend/ # Next.js frontend
├── libs/              # Shared libraries
├── infra/             # Infrastructure configs
├── docs/              # Documentation
└── configs/           # Global configurations
```

## 🔧 Services

- **api-gateway**: Central routing, auth, rate limiting
- **auth-svc**: Authentication, JWT, RBAC
- **user-svc**: User profiles, addresses, roles
- **catalog-svc**: Products, categories, search
- **cart-svc**: Shopping cart, reservations
- **order-svc**: Order lifecycle, checkout
- **payment-svc**: Payment processing, webhooks
- **notification-svc**: Email, SMS, push notifications
- **websocket-gateway**: Real-time communications

## 📚 Documentation

- [Architecture](./docs/architecture.md)
- [API Documentation](./docs/api.md)
- [Deployment Guide](./docs/deployment.md)
- [Development Guide](./docs/development.md)

## 🎯 Roadmap

- [x] Phase 1: Foundation & Core Setup
- [x] Phase 2: E-Commerce Domain Services
- [ ] Phase 3: Infrastructure & Observability
- [ ] Phase 4: Advanced RBAC & Multi-Tenancy
- [ ] Phase 5: Extensibility & New Modules
- [ ] Phase 6: Testing, CI/CD, Cloud Migration
- [ ] Phase 7: SaaS Enablement & Scaling

## 📄 License

MIT License
