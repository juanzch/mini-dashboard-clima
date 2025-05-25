import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WeatherService } from './weather/weather.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const weatherService = app.get(WeatherService);
  console.log('running initial seeder...');

  await weatherService.fetchAndSaveWeather();
  const latest = await weatherService.getLatest().catch(() => null);

  if (!latest) {
    await weatherService.fetchAndSaveWeather();
    console.log('seeder completed');
  } else {
    console.log('A snapshot already exists, it cannot be duplicated');
  }

  await app.close();
}

bootstrap();
