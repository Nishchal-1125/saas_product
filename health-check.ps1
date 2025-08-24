#!/usr/bin/env pwsh

# E-Commerce Services Health Check Script

Write-Host "🏥 E-Commerce Services Health Check" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan

$services = @(
    @{ Name = "API Gateway"; Url = "http://localhost:3000/health"; Port = 3000 },
    @{ Name = "Auth Service"; Url = "http://localhost:3001/health"; Port = 3001 },
    @{ Name = "User Service"; Url = "http://localhost:3002/health"; Port = 3002 },
    @{ Name = "Catalog Service"; Url = "http://localhost:3003/health"; Port = 3003 },
    @{ Name = "Cart Service"; Url = "http://localhost:3004/health"; Port = 3004 },
    @{ Name = "Order Service"; Url = "http://localhost:3005/health"; Port = 3005 },
    @{ Name = "Payment Service"; Url = "http://localhost:3006/health"; Port = 3006 },
    @{ Name = "Notification Service"; Url = "http://localhost:3007/health"; Port = 3007 },
    @{ Name = "WebSocket Gateway"; Url = "http://localhost:3008/health"; Port = 3008 },
    @{ Name = "Frontend"; Url = "http://localhost:3010"; Port = 3010 }
)

$infrastructure = @(
    @{ Name = "PostgreSQL"; Port = 5432 },
    @{ Name = "Redis"; Port = 6379 },
    @{ Name = "MongoDB"; Port = 27017 }
)

Write-Host "`n🔍 Checking Infrastructure Services..." -ForegroundColor Blue

foreach ($infra in $infrastructure) {
    try {
        $connection = New-Object System.Net.Sockets.TcpClient
        $connection.Connect("localhost", $infra.Port)
        $connection.Close()
        Write-Host "✅ $($infra.Name) (Port $($infra.Port))" -ForegroundColor Green
    }
    catch {
        Write-Host "❌ $($infra.Name) (Port $($infra.Port)) - Not responding" -ForegroundColor Red
    }
}

Write-Host "`n🔍 Checking Application Services..." -ForegroundColor Blue

foreach ($service in $services) {
    try {
        $response = Invoke-WebRequest -Uri $service.Url -TimeoutSec 5 -UseBasicParsing -ErrorAction Stop
        if ($response.StatusCode -eq 200) {
            Write-Host "✅ $($service.Name)" -ForegroundColor Green
        } else {
            Write-Host "⚠️  $($service.Name) - HTTP $($response.StatusCode)" -ForegroundColor Yellow
        }
    }
    catch {
        Write-Host "❌ $($service.Name) - Not responding" -ForegroundColor Red
    }
}

Write-Host "`n📊 System Status Summary:" -ForegroundColor Cyan

# Check overall system health
$totalServices = $services.Count + $infrastructure.Count
$healthyServices = 0

foreach ($infra in $infrastructure) {
    try {
        $connection = New-Object System.Net.Sockets.TcpClient
        $connection.Connect("localhost", $infra.Port)
        $connection.Close()
        $healthyServices++
    }
    catch {
        # Service not healthy
    }
}

foreach ($service in $services) {
    try {
        $response = Invoke-WebRequest -Uri $service.Url -TimeoutSec 5 -UseBasicParsing -ErrorAction Stop
        if ($response.StatusCode -eq 200) {
            $healthyServices++
        }
    }
    catch {
        # Service not healthy
    }
}

$healthPercentage = [math]::Round(($healthyServices / $totalServices) * 100, 1)

if ($healthPercentage -ge 80) {
    Write-Host "🟢 System Health: $healthPercentage% ($healthyServices/$totalServices services healthy)" -ForegroundColor Green
} elseif ($healthPercentage -ge 50) {
    Write-Host "🟡 System Health: $healthPercentage% ($healthyServices/$totalServices services healthy)" -ForegroundColor Yellow
} else {
    Write-Host "🔴 System Health: $healthPercentage% ($healthyServices/$totalServices services healthy)" -ForegroundColor Red
}

Write-Host "`n📝 Quick Access URLs:" -ForegroundColor Cyan
Write-Host "  🌐 Frontend:        http://localhost:3010" -ForegroundColor White
Write-Host "  🔌 API Gateway:     http://localhost:3000" -ForegroundColor White
Write-Host "  📚 API Docs:        http://localhost:3000/docs" -ForegroundColor White
Write-Host "  🔐 Login Page:      http://localhost:3010/auth" -ForegroundColor White

if ($healthPercentage -lt 100) {
    Write-Host "`n💡 Troubleshooting Tips:" -ForegroundColor Yellow
    Write-Host "  • Run '.\start-all.ps1' to start all services" -ForegroundColor Gray
    Write-Host "  • Check Docker Desktop is running for infrastructure services" -ForegroundColor Gray
    Write-Host "  • Wait a few moments for services to fully start up" -ForegroundColor Gray
    Write-Host "  • Run 'docker-compose logs [service-name]' to check logs" -ForegroundColor Gray
}

Write-Host ""
