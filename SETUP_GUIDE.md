# 🚀 Complete E-Commerce Setup Guide

This guide will get your entire e-commerce platform up and running in minutes!

## 📋 Prerequisites Checklist

Before starting, ensure you have:

- [ ] **Node.js** >= 20.0.0 ([Download](https://nodejs.org/))
- [ ] **Docker Desktop** ([Download](https://www.docker.com/products/docker-desktop/))
- [ ] **Git** ([Download](https://git-scm.com/))
- [ ] **PowerShell** (Windows) or **Bash** (Linux/Mac)

## 🎯 Quick Start (5 Minutes)

### Step 1: Start Everything
```powershell
# Windows PowerShell
.\start-all.ps1

# Linux/Mac Bash
./start-all.sh
```

### Step 2: Wait for Services
The script will automatically:
- ✅ Install all dependencies
- ✅ Start infrastructure (PostgreSQL, Redis, MongoDB)
- ✅ Start all backend services
- ✅ Start the frontend
- ✅ Set up the reverse proxy

### Step 3: Access Your Platform
- **Frontend**: http://localhost:3010
- **API Documentation**: http://localhost:3000/docs

## 🔐 Demo Accounts (Ready to Use!)

| Role | Email | Password | Features |
|------|-------|----------|----------|
| 👑 **Superadmin** | `superadmin@demo.com` | `password123` | Full system control, user management, analytics |
| 👨‍💼 **Admin** | `admin@demo.com` | `password123` | Product management, order processing |
| 🏪 **Seller** | `seller@demo.com` | `password123` | Product catalog, sales analytics |
| 👤 **Customer** | `customer@demo.com` | `password123` | Shopping, orders, profile |

## 🛠️ Manual Setup (Development)

If you prefer to start services individually:

### 1. Infrastructure First
```bash
# Start databases
docker-compose up -d postgres redis mongodb
```

### 2. Backend Services
```bash
# Terminal 1 - Auth Service
cd services/auth-svc
npm install && npm run dev

# Terminal 2 - API Gateway  
cd services/api-gateway
npm install && npm run dev

# Terminal 3 - Catalog Service
cd services/catalog-svc
npm install && npm run dev

# Continue for other services...
```

### 3. Frontend
```bash
# Terminal N - Frontend
cd ecommerce-frontend
npm install && npm run dev
```

## 🔍 Health Check

Check if all services are running:
```powershell
.\health-check.ps1
```

## 🏗️ Architecture Overview

### Backend Services (NestJS)
- **API Gateway** (3000) - Central routing and docs
- **Auth Service** (3001) - JWT authentication & RBAC
- **User Service** (3002) - User profiles and management
- **Catalog Service** (3003) - Products and categories
- **Cart Service** (3004) - Shopping cart operations
- **Order Service** (3005) - Order processing
- **Payment Service** (3006) - Payment handling
- **Notification Service** (3007) - Email/SMS notifications
- **WebSocket Gateway** (3008) - Real-time updates

### Frontend (Next.js)
- **Customer Portal** (3010) - Shopping interface
- **Admin Dashboard** - Management interface
- **Responsive Design** - Mobile-first approach

### Infrastructure
- **PostgreSQL** (5432) - Primary database
- **Redis** (6379) - Caching and sessions
- **MongoDB** (27017) - Document storage
- **Nginx** (80) - Reverse proxy

## 🎨 What You'll See

### Customer Experience
1. **Homepage** - Modern landing page with categories
2. **Product Catalog** - Searchable product grid with filters
3. **Shopping Cart** - Add/remove items, quantity management
4. **Checkout** - Secure payment processing
5. **Order Tracking** - Real-time order status updates
6. **User Dashboard** - Order history and profile management

### Admin Features
1. **User Management** - Create, edit, delete users
2. **Product Management** - Add, edit, categorize products
3. **Order Processing** - Manage order lifecycle
4. **Analytics Dashboard** - Sales and performance metrics
5. **Role-Based Access** - Granular permission system

## 🔧 Customization

### Adding New Products
1. Login as Admin/Seller
2. Navigate to Dashboard → Products
3. Click "Add New Product"
4. Fill in details and upload images

### Managing Users
1. Login as Superadmin/Admin
2. Navigate to Dashboard → Users
3. View, edit, or create user accounts

### Viewing Analytics
1. Login as Admin or higher
2. Navigate to Dashboard → Analytics
3. View sales, user, and system metrics

## 🚨 Troubleshooting

### Common Issues

#### Port Already in Use
```powershell
# Check what's using the port
netstat -ano | findstr :3000

# Kill the process
taskkill /PID <process-id> /F
```

#### Docker Not Running
1. Start Docker Desktop
2. Wait for it to fully initialize
3. Run `docker version` to verify

#### Services Not Starting
```powershell
# Check logs
.\logs.ps1

# Or check specific service
docker-compose logs service-name
```

#### Frontend Build Errors
```bash
cd ecommerce-frontend
rm -rf .next node_modules
npm install
npm run dev
```

### Performance Tips

1. **Allocate More Memory to Docker**
   - Docker Desktop → Settings → Resources
   - Increase Memory to 8GB+ for better performance

2. **Use SSD Storage**
   - Store the project on SSD for faster builds

3. **Close Unnecessary Applications**
   - Free up system resources for better performance

## 🔄 Management Commands

```powershell
# Start everything
.\start-all.ps1

# Stop everything  
.\stop-all.ps1

# View logs
.\logs.ps1

# Health check
.\health-check.ps1

# Clean restart (removes all data)
.\start-all.ps1 -Clean

# Skip dependency installation
.\start-all.ps1 -SkipBuild
```

## 📊 System Requirements

### Minimum
- **RAM**: 8GB
- **Storage**: 5GB free space
- **CPU**: Quad-core
- **OS**: Windows 10+, macOS 10.15+, Ubuntu 18.04+

### Recommended
- **RAM**: 16GB+
- **Storage**: 10GB+ SSD
- **CPU**: 8-core
- **Network**: Stable internet connection

## 🔐 Security Features

- **JWT Authentication** with refresh tokens
- **Role-Based Access Control** (RBAC)
- **Input Validation** and sanitization
- **SQL Injection Prevention**
- **XSS Protection**
- **Rate Limiting**
- **CORS Configuration**
- **Helmet.js Security Headers**

## 🚀 Next Steps

After setup, you can:

1. **Explore the Admin Dashboard**
   - Login as admin to see management features
   
2. **Test the Shopping Flow**
   - Login as customer and place an order
   
3. **Add Custom Products**
   - Login as seller and add your products
   
4. **Customize the UI**
   - Modify components in `ecommerce-frontend/src/components`
   
5. **Extend Functionality**
   - Add new microservices or modify existing ones

## 📞 Getting Help

- **Documentation**: Check `/docs` folder
- **API Docs**: http://localhost:3000/docs
- **Health Check**: `.\health-check.ps1`
- **Logs**: `.\logs.ps1`

## 🎉 Success Indicators

You'll know everything is working when:

- ✅ All services show green in health check
- ✅ Frontend loads at http://localhost:3010
- ✅ You can login with demo accounts
- ✅ Products are visible and searchable
- ✅ Admin dashboard is accessible
- ✅ Shopping cart functionality works

---

**Congratulations! Your e-commerce platform is ready! 🎉**

Start by logging in with any demo account and exploring the features. The platform includes everything you need for a complete e-commerce solution!
