import { Controller, Get } from '@nestjs/common';

@Controller('health')
export class HealthController {

  @Get()
  getHealth() {
    return {
      status: 'ok',
      service: 'catalog-svc',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    };
  }

  @Get('ready')
  getReadiness() {
    return {
      status: 'ready',
      service: 'catalog-svc',
      timestamp: new Date().toISOString(),
    };
  }
}
