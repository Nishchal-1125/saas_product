import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './auth/auth.controller';
import { HealthController } from './health/health.controller';
import { CatalogController } from './catalog/catalog.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AuthController, HealthController, CatalogController],
  providers: [],
})
export class AppModule {}
