import { WeatherSnapshot } from "@/types/types";

interface Props {
  weather: WeatherSnapshot;
}

export default function WeatherCard({ weather }: Props) {
  const date = new Date(weather.capturedAt).toLocaleString("es-CO", {
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
    day: "numeric",
    month: "long",
  });

  return (
    <div className="bg-linear-to-b from-[#2d56bf] to-[#4BA1EA] flex flex-col md:flex-row lg:flex-col rounded-t-xl lg:rounded-r-none lg:rounded-l-xl p-6 lg:w-[350px] text-white">
      <div className=" flex flex-col justify-between">
        <div className="font-bold">Bogota, Colombia </div>
        <div className="pt-3 text-center"> {date}</div>
        <div className="flex m-auto py-[3rem]">
          <p className="text-6xl sm:text-7xl">{weather.temperature}</p>
          <p className="text-2xl md:text-3xl">°C</p>
        </div>
      </div>
      <div className="flex-grow md:ml-16 lg:ml-0 flex flex-col gap-3 text-xl justify-center text-[#dee7ff]">
        <div className="flex flex-col sm:flex-row justify-between items-center"> 
          <p className="font-bold">Sensación térmica:</p>
          <p>{weather.feelsLike}°C</p>
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-center"> 
          <p className="font-bold">Humedad:</p>
          <p>{weather.humidity}°C</p>
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-center"> 
          <p className="font-bold">Condiciones:</p>
          <p>{weather.condition}°C</p>
        </div>
      </div>
    </div>
  );
}
