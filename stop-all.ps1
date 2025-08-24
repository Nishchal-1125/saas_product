#!/usr/bin/env pwsh

# E-Commerce Microservices Stop Script

Write-Host "🛑 Stopping E-Commerce Microservices..." -ForegroundColor Red
Write-Host "=====================================" -ForegroundColor Red

# Stop Docker containers
Write-Host "🐳 Stopping Docker containers..." -ForegroundColor Yellow
docker-compose down

# Kill Node.js processes (services)
Write-Host "🔪 Stopping Node.js services..." -ForegroundColor Yellow
Get-Process -Name node -ErrorAction SilentlyContinue | Where-Object { $_.MainWindowTitle -match "nest|next" } | Stop-Process -Force

# Alternative method to kill processes on specific ports
$ports = @(3000, 3001, 3002, 3003, 3004, 3005, 3006, 3007, 3008, 3010)

foreach ($port in $ports) {
    $process = Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess
    if ($process) {
        Write-Host "🔪 Killing process on port $port..." -ForegroundColor Yellow
        Stop-Process -Id $process -Force -ErrorAction SilentlyContinue
    }
}

Write-Host "✅ All services stopped!" -ForegroundColor Green
