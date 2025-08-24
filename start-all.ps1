param(
    [switch]$Clean,
    [switch]$Verbose
)

$ErrorActionPreference = "Stop"

function Test-Port {
    param([int]$Port)
    try {
        $connection = Test-NetConnection -ComputerName "localhost" -Port $Port -WarningAction SilentlyContinue
        return $connection.TcpTestSucceeded
    } catch {
        return $false
    }
}

function Wait-ForPort {
    param([int]$Port, [string]$ServiceName, [int]$TimeoutSeconds = 60)
    
    Write-Host "Waiting for $ServiceName on port $Port..." -ForegroundColor Yellow
    $elapsed = 0
    while ($elapsed -lt $TimeoutSeconds) {
        if (Test-Port -Port $Port) {
            Write-Host "$ServiceName is ready on port $Port" -ForegroundColor Green
            return $true
        }
        Start-Sleep -Seconds 2
        $elapsed += 2
    }
    Write-Host "$ServiceName not ready on port $Port after $TimeoutSeconds seconds" -ForegroundColor Yellow
    return $false
}

function Check-Prerequisites {
    Write-Host "Checking prerequisites..." -ForegroundColor Blue
    
    try {
        docker --version | Out-Null
        Write-Host "Docker is available" -ForegroundColor Green
    } catch {
        Write-Host "Docker is not installed or not in PATH" -ForegroundColor Red
        exit 1
    }
    
    try {
        docker compose version | Out-Null
        Write-Host "Docker Compose is available" -ForegroundColor Green
    } catch {
        Write-Host "Docker Compose is not installed or not in PATH" -ForegroundColor Red
        exit 1
    }
    
    try {
        $nodeVersion = node --version
        Write-Host "Node.js is available ($nodeVersion)" -ForegroundColor Green
    } catch {
        Write-Host "Node.js is not installed or not in PATH" -ForegroundColor Red
        exit 1
    }
    
    try {
        $npmVersion = npm --version
        Write-Host "npm is available ($npmVersion)" -ForegroundColor Green
    } catch {
        Write-Host "npm is not installed or not in PATH" -ForegroundColor Red
        exit 1
    }
}

function Stop-ExistingServices {
    if ($Clean) {
        Write-Host "Cleaning up existing services..." -ForegroundColor Yellow
        
        try {
            docker compose down --remove-orphans 2>$null
        } catch {
            # Ignore errors
        }
        
        $ports = @(3000, 3001, 3002, 3003, 3004, 3005, 3006, 3007, 3008, 3009, 3010)
        foreach ($port in $ports) {
            try {
                $processes = Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess
                foreach ($process in $processes) {
                    Stop-Process -Id $process -Force -ErrorAction SilentlyContinue
                }
            } catch {
                # Ignore errors
            }
        }
        Write-Host "Cleanup completed" -ForegroundColor Green
    }
}

function Install-Dependencies {
    Write-Host "Installing dependencies..." -ForegroundColor Blue
    
    npm install
    
    Set-Location "ecommerce-frontend"
    npm install
    Set-Location ".."
    
    Write-Host "Building shared libraries..." -ForegroundColor Blue
    if (Test-Path "libs/shared-dtos/package.json") {
        npm run build --workspace=libs/shared-dtos
    }
    if (Test-Path "libs/auth-utils/package.json") {
        npm run build --workspace=libs/auth-utils
    }
    if (Test-Path "libs/db-utils/package.json") {
        npm run build --workspace=libs/db-utils
    }
}

function Start-Infrastructure {
    Write-Host "Starting infrastructure services..." -ForegroundColor Blue
    
    docker compose up -d postgres redis mongodb
    
    Wait-ForPort -Port 5432 -ServiceName "PostgreSQL"
    Wait-ForPort -Port 6379 -ServiceName "Redis"
    Wait-ForPort -Port 27017 -ServiceName "MongoDB"
}

function Start-BackendServices {
    Write-Host "Starting backend services..." -ForegroundColor Blue
    
    $services = @(
        @{name="auth-svc"; port=3001; path="services/auth-svc"},
        @{name="user-svc"; port=3002; path="services/user-svc"},
        @{name="catalog-svc"; port=3003; path="services/catalog-svc"},
        @{name="cart-svc"; port=3004; path="services/cart-svc"},
        @{name="order-svc"; port=3005; path="services/order-svc"},
        @{name="payment-svc"; port=3006; path="services/payment-svc"},
        @{name="notification-svc"; port=3007; path="services/notification-svc"},
        @{name="websocket-gateway"; port=3008; path="services/websocket-gateway"},
        @{name="api-gateway"; port=3000; path="services/api-gateway"}
    )
    
    foreach ($service in $services) {
        if (Test-Path "$($service.path)/package.json") {
            Write-Host "Starting $($service.name)..." -ForegroundColor Cyan
            Set-Location $service.path
            Start-Process -FilePath "npm" -ArgumentList "run", "dev" -WindowStyle Minimized
            Set-Location "../.."
            Start-Sleep -Seconds 3
        }
    }
    
    # Wait for API Gateway
    Wait-ForPort -Port 3000 -ServiceName "API Gateway" -TimeoutSeconds 120
}

function Start-Frontend {
    Write-Host "Starting frontend..." -ForegroundColor Blue
    
    if (Test-Path "ecommerce-frontend/package.json") {
        Set-Location "ecommerce-frontend"
        Start-Process -FilePath "npm" -ArgumentList "run", "dev" -WindowStyle Minimized
        Set-Location ".."
        
        Wait-ForPort -Port 3010 -ServiceName "Frontend" -TimeoutSeconds 60
    }
}

function Test-ServiceHealth {
    Write-Host "Testing service health..." -ForegroundColor Blue
    
    $healthChecks = @(
        @{url="http://localhost:3000/health"; name="API Gateway"},
        @{url="http://localhost:3001/health"; name="Auth Service"},
        @{url="http://localhost:3002/health"; name="User Service"},
        @{url="http://localhost:3003/health"; name="Catalog Service"},
        @{url="http://localhost:3010"; name="Frontend"}
    )
    
    foreach ($check in $healthChecks) {
        try {
            $response = Invoke-WebRequest -Uri $check.url -TimeoutSec 10 -UseBasicParsing
            if ($response.StatusCode -eq 200) {
                Write-Host "$($check.name) is healthy" -ForegroundColor Green
            } else {
                Write-Host "$($check.name) returned status $($response.StatusCode)" -ForegroundColor Yellow
            }
        } catch {
            Write-Host "$($check.name) health check failed" -ForegroundColor Yellow
        }
    }
}

# Main execution
try {
    Write-Host "Starting E-Commerce Platform..." -ForegroundColor Magenta
    Write-Host "=================================" -ForegroundColor Magenta
    
    Stop-ExistingServices
    Check-Prerequisites
    Install-Dependencies
    Start-Infrastructure
    Start-BackendServices
    Start-Frontend
    
    Write-Host "Waiting for all services to stabilize..." -ForegroundColor Yellow
    Start-Sleep -Seconds 10
    
    Test-ServiceHealth
    
    Write-Host ""
    Write-Host "=================================" -ForegroundColor Green
    Write-Host "E-Commerce Platform Started!" -ForegroundColor Green
    Write-Host "=================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "Access Points:" -ForegroundColor Cyan
    Write-Host "  Frontend:     http://localhost:3010" -ForegroundColor White
    Write-Host "  API Gateway:  http://localhost:3000" -ForegroundColor White
    Write-Host "  API Docs:     http://localhost:3000/docs" -ForegroundColor White
    Write-Host ""
    Write-Host "Demo Accounts:" -ForegroundColor Cyan
    Write-Host "  Superadmin:  superadmin@demo.com / password123" -ForegroundColor White
    Write-Host "  Admin:       admin@demo.com / password123" -ForegroundColor White
    Write-Host "  Seller:      seller@demo.com / password123" -ForegroundColor White
    Write-Host "  Customer:    customer@demo.com / password123" -ForegroundColor White
    Write-Host ""
    Write-Host "Management Commands:" -ForegroundColor Cyan
    Write-Host "  Stop all:       .\stop-all.ps1" -ForegroundColor White
    Write-Host "  Health check:   .\health-check.ps1" -ForegroundColor White
    Write-Host "  View logs:      .\logs.ps1" -ForegroundColor White
    Write-Host ""
    Write-Host "Ready for testing!" -ForegroundColor Green
    
} catch {
    Write-Host "Failed to start platform: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}
