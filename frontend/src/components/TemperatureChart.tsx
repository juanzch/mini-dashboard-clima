"use client";

import { WeatherSnapshot } from "@/types/types";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

interface Props {
  data: WeatherSnapshot[];
}

export default function TemperatureChart({ data }: Props) {
  const formattedData = data
    .slice()
    .reverse()
    .map((item) => ({
      ...item,
      time: new Date(item.capturedAt).toLocaleTimeString("es-CO", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    }));

  return (
    <div className=" bg-[#ffffff] flex-grow rounded-b-xl lg:rounded-l-none lg:rounded-r-xl p-4 mb-[2rem] lg:mb-0 ">
      <h2 className="text-lg font-semibold mb-2">
        🌡️ Temperatura (últimas 24 h)
      </h2>
      <div className="overflow-x-auto">
        <ResponsiveContainer
          width="100%"
          height={400}
          className="min-w-[500px]!"
        >
          <LineChart data={formattedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis domain={["auto", "auto"]} unit="°C" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="temperature"
              stroke="#0070f3"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
