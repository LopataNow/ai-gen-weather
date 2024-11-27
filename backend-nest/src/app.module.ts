import { Module } from '@nestjs/common';
import { GenWeatherDtoController } from './controllers/gen-werather.controller';
import { GerminiService } from './services/germini.service';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ThrottlerModule.forRoot([{
      ttl: 800,
      limit: 2,
    }]),
  ],
  controllers: [GenWeatherDtoController],
  providers: [GerminiService],
})
export class AppModule {}
