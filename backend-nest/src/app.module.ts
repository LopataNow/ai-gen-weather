import { Module } from '@nestjs/common';
import { GenWeatherDtoController } from './controllers/gen-werather.controller';
import { GerminiService } from './services/germini.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { MongooseModule } from '@nestjs/mongoose';
import { Weather, WeatherSchema } from './schemas/weather.schema';
import { WeatherService } from './services/wether.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        console.log('mongo');
        console.log(process.env.MONGODB);
        return {uri: configService.get<string>('MONGODB')};
      },
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([{ name: Weather.name, schema: WeatherSchema }]),
    ThrottlerModule.forRoot([{
      ttl: 800,
      limit: 2,
    }]),
  ],
  controllers: [GenWeatherDtoController],
  providers: [GerminiService, WeatherService],
})
export class AppModule {}
