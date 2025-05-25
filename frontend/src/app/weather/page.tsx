"use client";
import { useEffect, useState } from "react";
import { getLatestWeather, getWeatherHistory } from "@/services/weather";
import { WeatherSnapshot } from "@/types/types";
import WeatherCard from "@/components/WeatherCard";
import TemperatureChart from "@/components/TemperatureChart";
import { clearToken } from "@/services/auth";
import Link from "next/link";

export default function WeatherPage() {
  const [latest, setLatest] = useState<WeatherSnapshot | null>(null);
  const [history, setHistory] = useState<WeatherSnapshot[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getLatestWeather()
      .then(setLatest)
      .catch((err) => setError(err.message));

    getWeatherHistory()
      .then(setHistory)
      .catch((err) => setError(err.message));
  }, []);
  return (
    <main className="p-7 bg-[#E0E9F8] w-full min-h-screen flex flex-col justify-between">
      <div>
        <Link
          href={'/'}
          onClick={clearToken}
          className="bg-white w-[4rem] hover:bg-[#f9f9ff] text-xs md:text-base md:w-[6rem] text-[#5398ff] mb-[2rem] px-2 md:px-4 py-1 md:py-2 rounded"
        >
          Log out
        </Link>
        <h1 className="mt-4 cursor-default font-bold text-4xl sm:text-6xl md:text-8xl mb-[3rem] text-center md:text-start bg-gradient-to-r from-[#5398ff] to-[#9baaff] text-transparent bg-clip-text">
          Mini Dashboard del Clima.
        </h1>
      </div>
      {error && <p className="text-red-500">Error: {error}</p>}

      <div className="flex flex-col lg:flex-row">
        {latest && <WeatherCard weather={latest} />}
        {history.length > 0 && <TemperatureChart data={history} />}
      </div>
    </main>
  );
}
