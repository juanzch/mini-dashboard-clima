import { WeatherSnapshot } from "@/types/types";
import { fetchWithAuth } from "./api";

const API = process.env.NEXT_PUBLIC_API_URL;


export function getLatestWeather(): Promise<WeatherSnapshot> {
  return fetchWithAuth('/weather/latest');
}

export function getWeatherHistory(limit = 24): Promise<WeatherSnapshot[]> {
  return fetchWithAuth(`/weather/history?limit=${limit}`);
}