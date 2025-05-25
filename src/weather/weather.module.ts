import { Module } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { WeatherController } from './weather.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WeatherSnapshot } from './entities/weather.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WeatherSnapshot])],
  controllers: [WeatherController],
  providers: [WeatherService],
})
export class WeatherModule {}
