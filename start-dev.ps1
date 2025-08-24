# SaaS Product Development Startup Script
Write-Host "Starting SaaS Product Development Environment" -ForegroundColor Green

# Kill any existing processes
Write-Host "Stopping existing processes..." -ForegroundColor Yellow
taskkill /f /im node.exe 2>$null
Start-Sleep 2

Write-Host "Port Configuration:" -ForegroundColor Cyan
Write-Host "   Frontend:     3000" -ForegroundColor White
Write-Host "   API Gateway:  8000" -ForegroundColor White  
Write-Host "   Auth Service: 10000" -ForegroundColor White
Write-Host "   Catalog Svc:  11000" -ForegroundColor White
Write-Host "   Cart Service: 12000" -ForegroundColor White

Write-Host "`nStarting Services..." -ForegroundColor Cyan

# Start Auth Service
Write-Host "   Starting Auth Service on port 10000..." -ForegroundColor Gray
Start-Process powershell -ArgumentList "-NoProfile", "-Command", "cd 'C:\Users\Rakesh Baluni\Documents\GitHub\saas_product\services\auth-svc'; npm run start:dev" -WindowStyle Minimized

Start-Sleep 3

# Start Catalog Service  
Write-Host "   Starting Catalog Service on port 11000..." -ForegroundColor Gray
Start-Process powershell -ArgumentList "-NoProfile", "-Command", "cd 'C:\Users\Rakesh Baluni\Documents\GitHub\saas_product\services\catalog-svc'; npm run start:dev" -WindowStyle Minimized

Start-Sleep 3

# Start Cart Service
Write-Host "   Starting Cart Service on port 12000..." -ForegroundColor Gray
Start-Process powershell -ArgumentList "-NoProfile", "-Command", "cd 'C:\Users\Rakesh Baluni\Documents\GitHub\saas_product\services\cart-svc'; npm run start:dev" -WindowStyle Minimized

Start-Sleep 3

# Start API Gateway
Write-Host "   Starting API Gateway on port 8000..." -ForegroundColor Gray
Start-Process powershell -ArgumentList "-NoProfile", "-Command", "cd 'C:\Users\Rakesh Baluni\Documents\GitHub\saas_product\services\api-gateway'; npm run start:dev" -WindowStyle Minimized

Start-Sleep 5

# Start Frontend
Write-Host "   Starting Frontend on port 3000..." -ForegroundColor Gray
Start-Process powershell -ArgumentList "-NoProfile", "-Command", "cd 'C:\Users\Rakesh Baluni\Documents\GitHub\saas_product\ecommerce-frontend'; npm run dev" -WindowStyle Minimized

Write-Host "`nWaiting for all services to start..." -ForegroundColor Yellow
Start-Sleep 10

Write-Host "`nAll Services Started Successfully!" -ForegroundColor Green
Write-Host "`nAccess Points:" -ForegroundColor Cyan
Write-Host "   Frontend:        http://localhost:3000" -ForegroundColor White
Write-Host "   API Gateway:     http://localhost:8000" -ForegroundColor White
Write-Host "   Auth Service:    http://localhost:10000" -ForegroundColor White
Write-Host "   Catalog Service: http://localhost:11000" -ForegroundColor White
Write-Host "   Cart Service:    http://localhost:12000" -ForegroundColor White

Write-Host "`nDemo Accounts:" -ForegroundColor Yellow
Write-Host "   SUPERADMIN: superadmin@demo.com / password123" -ForegroundColor White
Write-Host "   ADMIN:      admin@demo.com / password123" -ForegroundColor White
Write-Host "   SELLER:     seller@demo.com / password123" -ForegroundColor White
Write-Host "   CUSTOMER:   customer@demo.com / password123" -ForegroundColor White

Write-Host "`nReady to use at: http://localhost:3000" -ForegroundColor Green
