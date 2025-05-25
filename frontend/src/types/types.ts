export interface WeatherSnapshot {
  id: number;
  temperature: number;
  feelsLike: number;
  humidity: number;
  condition: string;
  capturedAt: string;
}