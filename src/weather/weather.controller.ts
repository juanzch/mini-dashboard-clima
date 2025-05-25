import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { WeatherSnapshot } from './entities/weather.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @UseGuards(JwtAuthGuard)
  @Get('latest')
  getLatest(): Promise<WeatherSnapshot> {
    return this.weatherService.getLatest();
  }

  @UseGuards(JwtAuthGuard)
  @Get('history')
  getHistory(@Query('limit') limit = 24): Promise<WeatherSnapshot[]> {
    return this.weatherService.getHistory(limit);
  }
}
