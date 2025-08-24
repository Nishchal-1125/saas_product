#!/usr/bin/env pwsh

# E-Commerce Microservices Logs Viewer

param(
    [string]$Service = "all",  # all, docker, api-gateway, auth, frontend, etc.
    [switch]$Follow = $true
)

Write-Host "📋 E-Commerce Microservices Logs" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan

switch ($Service.ToLower()) {
    "all" {
        Write-Host "📋 Showing all Docker logs..." -ForegroundColor Yellow
        docker-compose logs -f
    }
    "docker" {
        Write-Host "📋 Showing Docker container logs..." -ForegroundColor Yellow
        docker-compose logs -f
    }
    "frontend" {
        Write-Host "📋 Showing Frontend logs..." -ForegroundColor Yellow
        Write-Host "Frontend is running on port 3010" -ForegroundColor Gray
        Write-Host "Check the terminal where you started the frontend service" -ForegroundColor Gray
    }
    "api-gateway" {
        Write-Host "📋 Showing API Gateway logs..." -ForegroundColor Yellow
        Write-Host "API Gateway is running on port 3000" -ForegroundColor Gray
        Write-Host "Check the terminal where you started the API Gateway service" -ForegroundColor Gray
    }
    "auth" {
        Write-Host "📋 Showing Auth Service logs..." -ForegroundColor Yellow
        Write-Host "Auth Service is running on port 3001" -ForegroundColor Gray
        Write-Host "Check the terminal where you started the Auth service" -ForegroundColor Gray
    }
    default {
        Write-Host "❌ Unknown service: $Service" -ForegroundColor Red
        Write-Host "Available services: all, docker, frontend, api-gateway, auth" -ForegroundColor Yellow
    }
}
