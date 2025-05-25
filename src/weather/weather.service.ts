import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WeatherSnapshot } from './entities/weather.entity';
import { Repository } from 'typeorm';
import axios from 'axios';
import { Cron, CronExpression } from '@nestjs/schedule';

interface OpenWeatherResponse {
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  weather: {
    description: string;
  }[];
}

@Injectable()
export class WeatherService {
  constructor(
    @InjectRepository(WeatherSnapshot)
    private readonly weatherRepo: Repository<WeatherSnapshot>,
  ) {}

  private readonly API_KEY = process.env.OPENWEATHER_API_KEY;
  private readonly BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
  private readonly DEFAULT_CITY = process.env.DEFAULT_CITY;

  async fetchAndSaveWeather(): Promise<WeatherSnapshot> {
    const response = await axios.get<OpenWeatherResponse>(this.BASE_URL, {
      params: {
        q: this.DEFAULT_CITY,
        units: 'metric',
        appid: this.API_KEY,
      },
    });

    const data = response.data;

    const weather = this.weatherRepo.create({
      temperature: data.main.temp,
      feelsLike: data.main.feels_like,
      humidity: data.main.humidity,
      condition: data.weather[0].description,
    });

    return this.weatherRepo.save(weather);
  }

  async getLatest(): Promise<WeatherSnapshot> {
    const weather = await this.weatherRepo.findOne({
      where: {},
      order: { capturedAt: 'DESC' },
    });
    if (!weather) {
      throw new NotFoundException(`The last saved record has not been found `);
    }

    return weather;
  }

  async getHistory(limit = 24): Promise<WeatherSnapshot[]> {
    return this.weatherRepo.find({
      order: { capturedAt: 'DESC' },
      take: limit,
    });
  }

  @Cron(CronExpression.EVERY_HOUR)
  async handleCron() {
    console.log('capturing the weather');

    try {
      await this.fetchAndSaveWeather();
      console.log('weather saved successfully');
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err.message);
      } else {
        console.error('Unknown error', err);
      }
    }
  }
}
