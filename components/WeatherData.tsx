"use client";
import { Card, CardContent, CardHeader } from "./ui/card";

export default function WeatherData({ weatherData }: object) {
  return (
    <Card className="w-full max-w-md mx-auto mt-5">
      <CardHeader className="text-center text-xl font-bold">
        {weatherData.name} - {weatherData.main.temp}°C
      </CardHeader>
      <CardContent className="text-center">
        <p>Description: {weatherData.weather[0].main}</p>
        <p>Humidity: {weatherData.main.humidity}</p>
        <p>Wind Speed: {weatherData.wind.speed}</p>
      </CardContent>
    </Card>
  );
}
