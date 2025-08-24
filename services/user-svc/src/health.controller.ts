import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthController {
  async getHealth() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      service: 'auth-service'
    };
  }
}
