# Start all services locally
Write-Host "🚀 Starting all services locally..." -ForegroundColor Green
Write-Host ""

# Start databases in Docker (lightweight)
Write-Host "📦 Starting databases in Docker..." -ForegroundColor Yellow
docker compose up -d postgres mongodb redis

Start-Sleep 5

# Start backend services
Write-Host "🔧 Starting backend services..." -ForegroundColor Yellow

Write-Host "Starting Auth Service on port 10000..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'c:\Users\Rakesh Baluni\Documents\GitHub\saas_product\services\auth-svc'; npm run dev"

Write-Host "Starting Catalog Service on port 11000..." -ForegroundColor Cyan  
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'c:\Users\Rakesh Baluni\Documents\GitHub\saas_product\services\catalog-svc'; npm run dev"

Write-Host "Starting Cart Service on port 12000..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'c:\Users\Rakesh Baluni\Documents\GitHub\saas_product\services\cart-svc'; npm run dev"

Write-Host "Starting API Gateway on port 8000..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'c:\Users\Rakesh Baluni\Documents\GitHub\saas_product\services\api-gateway'; npm run dev"

# Start frontend
Write-Host "Starting Frontend on port 3000..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'c:\Users\Rakesh Baluni\Documents\GitHub\saas_product\ecommerce-frontend'; npm run dev"

Write-Host ""
Write-Host "✅ All services are starting up!" -ForegroundColor Green
Write-Host ""
Write-Host "🌐 URLs:" -ForegroundColor White
Write-Host "Frontend:     http://localhost:3000" -ForegroundColor Gray
Write-Host "API Gateway:  http://localhost:8000" -ForegroundColor Gray  
Write-Host "Auth Service: http://localhost:10000" -ForegroundColor Gray
Write-Host "Catalog:      http://localhost:11000" -ForegroundColor Gray
Write-Host "Cart:         http://localhost:12000" -ForegroundColor Gray
Write-Host ""
Write-Host "💡 Each service runs in its own terminal window" -ForegroundColor Yellow
Write-Host "💡 Use Ctrl+C in each window to stop individual services" -ForegroundColor Yellow
