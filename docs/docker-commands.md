# Docker Commands Cheat Sheet for E-commerce Platform

This guide provides all the Docker commands you need to manage your e-commerce platform.

## 🚀 Quick Start Commands

### First Time Setup
```powershell
# 1. Navigate to project directory
cd "C:\Users\Rakesh Baluni\Desktop\saas_product"

# 2. Create environment file (copy from .env.example)
cp .env.example .env
# Then edit .env with your actual values

# 3. Build all services
docker-compose build

# 4. Start everything in background
docker-compose up -d

# 5. Check if everything is running
docker-compose ps
```

## 📊 Monitoring Commands

### Check Service Status
```powershell
# View all running services
docker-compose ps

# View logs from all services
docker-compose logs

# View logs from specific service
docker-compose logs auth-svc

# Follow logs in real-time
docker-compose logs -f api-gateway

# View logs from last 100 lines
docker-compose logs --tail=100 postgres
```

### Resource Monitoring
```powershell
# View CPU and memory usage
docker stats

# View resource usage for specific container
docker stats ecommerce-postgres

# View detailed container information
docker inspect ecommerce-auth-svc
```

## 🔧 Development Commands

### Starting Services
```powershell
# Start all services
docker-compose up

# Start all services in background
docker-compose up -d

# Start specific services only
docker-compose up postgres redis mongodb

# Start with rebuilding
docker-compose up --build
```

### Stopping Services
```powershell
# Stop all services (keeps data)
docker-compose stop

# Stop specific service
docker-compose stop auth-svc

# Stop and remove containers (keeps data volumes)
docker-compose down

# Stop, remove containers AND volumes (DELETES ALL DATA!)
docker-compose down -v
```

### Rebuilding After Code Changes
```powershell
# Rebuild specific service
docker-compose build auth-svc

# Rebuild without cache (clean build)
docker-compose build --no-cache auth-svc

# Rebuild and restart service
docker-compose build auth-svc && docker-compose up -d auth-svc

# Rebuild all services
docker-compose build
```

## 🗄️ Database Management

### PostgreSQL Commands
```powershell
# Connect to PostgreSQL
docker-compose exec postgres psql -U postgres -d ecommerce

# Run SQL commands
docker-compose exec postgres psql -U postgres -d ecommerce -c "SELECT * FROM users LIMIT 5;"

# Backup database
docker-compose exec postgres pg_dump -U postgres ecommerce > backup.sql

# Restore database
docker-compose exec -T postgres psql -U postgres ecommerce < backup.sql
```

### MongoDB Commands
```powershell
# Connect to MongoDB
docker-compose exec mongodb mongosh --host localhost --port 27017

# Run MongoDB commands
docker-compose exec mongodb mongosh --eval "db.products.find().limit(5)"

# Backup MongoDB
docker-compose exec mongodb mongodump --host localhost --port 27017 --out /backup

# Import data
docker-compose exec mongodb mongoimport --host localhost --port 27017 --db ecommerce --collection products --file data.json
```

### Redis Commands
```powershell
# Connect to Redis
docker-compose exec redis redis-cli

# Check Redis memory usage
docker-compose exec redis redis-cli info memory

# View all keys
docker-compose exec redis redis-cli keys "*"

# Clear all cache
docker-compose exec redis redis-cli flushall
```

## 🐛 Debugging Commands

### Accessing Container Shell
```powershell
# Access container bash/shell
docker-compose exec auth-svc sh

# Access as root user
docker-compose exec --user root auth-svc sh

# Run one-time command in container
docker-compose exec auth-svc npm run test
```

### Debugging Network Issues
```powershell
# Test network connectivity between services
docker-compose exec api-gateway ping auth-svc

# Check port accessibility
docker-compose exec api-gateway nc -zv postgres 5432

# View network information
docker network ls
docker network inspect saas_product_ecommerce-network
```

### Debugging Service Issues
```powershell
# Check service health
docker-compose exec auth-svc curl http://localhost:3001/health

# View environment variables
docker-compose exec auth-svc env

# Check running processes
docker-compose exec auth-svc ps aux
```

## 🧹 Cleanup Commands

### Clean Up Containers
```powershell
# Remove stopped containers
docker container prune

# Remove unused images
docker image prune

# Remove unused volumes (BE CAREFUL!)
docker volume prune

# Remove everything unused (BE VERY CAREFUL!)
docker system prune

# Remove everything including volumes (NUCLEAR OPTION!)
docker system prune -a --volumes
```

### Selective Cleanup
```powershell
# Remove specific container
docker rm ecommerce-auth-svc

# Remove specific image
docker rmi saas_product_auth-svc

# Remove specific volume
docker volume rm saas_product_postgres_data
```

## 🔄 Update and Maintenance

### Updating Dependencies
```powershell
# Pull latest base images
docker-compose pull

# Rebuild with latest base images
docker-compose build --pull

# Update and restart
docker-compose pull && docker-compose build && docker-compose up -d
```

### Service Management
```powershell
# Restart specific service
docker-compose restart auth-svc

# Restart all services
docker-compose restart

# Scale service (run multiple instances)
docker-compose up -d --scale auth-svc=3

# Update service without downtime
docker-compose up -d --no-deps auth-svc
```

## 📈 Production Commands

### Health Checks
```powershell
# Check all service health
for service in auth-svc user-svc catalog-svc cart-svc order-svc payment-svc notification-svc; do
    echo "Checking $service..."
    docker-compose exec $service curl -f http://localhost:$(docker-compose port $service | cut -d: -f2)/health
done
```

### Performance Monitoring
```powershell
# Export metrics
docker stats --no-stream --format "table {{.Container}}\t{{.CPUPerc}}\t{{.MemUsage}}" > metrics.txt

# Monitor specific service
watch docker stats ecommerce-api-gateway
```

### Backup Commands
```powershell
# Backup all data volumes
docker run --rm -v saas_product_postgres_data:/data -v $(pwd):/backup alpine tar czf /backup/postgres-backup.tar.gz -C /data .

# Backup environment
cp .env .env.backup
cp docker-compose.yml docker-compose.yml.backup
```

## 🚨 Emergency Commands

### Quick Recovery
```powershell
# Emergency stop all
docker kill $(docker ps -q)

# Emergency restart platform
docker-compose down && docker-compose up -d

# Reset single service
docker-compose stop auth-svc && docker-compose rm -f auth-svc && docker-compose up -d auth-svc
```

### Troubleshooting Checklist
```powershell
# 1. Check if Docker is running
docker --version

# 2. Check available disk space
docker system df

# 3. Check for port conflicts
netstat -tlnp | grep :3000

# 4. Verify environment variables
docker-compose config

# 5. Test database connectivity
docker-compose exec api-gateway nc -zv postgres 5432
```

## 📚 Useful Aliases (Optional)

Add these to your PowerShell profile for convenience:

```powershell
# Docker Compose shortcuts
function dcu { docker-compose up -d }
function dcd { docker-compose down }
function dcb { docker-compose build }
function dcp { docker-compose ps }
function dcl { docker-compose logs -f $args }
function dcr { docker-compose restart $args }

# Usage examples:
# dcu          # Start all services
# dcl auth-svc # Follow auth service logs
# dcr postgres # Restart postgres
```

Remember: Always ensure your .env file is properly configured before running any Docker commands!
