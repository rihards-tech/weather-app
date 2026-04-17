import { useState } from 'react';
import SearchBar from '@/components/SearchBar';
import CurrentWeatherCard from "@/components/CurrentWeatherCard";
import HourlyForecast from "@/components/HourlyForecast";
import DailyForecast from "@/components/DailyForecast";
import ThemeToggle from '@/components/ThemeToggle';
import { searchCity } from '@/api/locationApi';
import { getWeather } from '@/api/weatherApi';
import { currentWeather, hourlyForecast, dailyForecast } from '@/api/weatherMock';

export default function Home() {
  const [city, setCity] = useState("");
  const [currentWeatherData, setCurrentWeatherData] = useState(currentWeather);

  function handleSearchChange(event) {
    setCity(event.target.value);
  }

  async function handleSearch() {
    const trimmedCity = city.trim();
    if(!trimmedCity) return;

    const data = await searchCity(trimmedCity);
    if (!data) return;

    const weather = await getWeather(data.lat, data.lng);
    const current = weather.current;

    const nextCurrentWeatherData = {
      city: data.name,
      temperature: Math.round(current.temperature_2m),
      condition: `Weather code ${current.weather_code}`,
      feelsLike: Math.round(current.apparent_temperature),
      humidity: current.relative_humidity_2m,
      windSpeed: Math.round(current.wind_speed_10m),
      dateTime: new Date().toLocaleString("en-US", {
        weekday: "long",
        hour: "numeric",
        minute: "2-digit",
      }),
      icon: current.is_day ? "☀️" : "🌙",
    };

    setCurrentWeatherData(nextCurrentWeatherData);

    console.log(data);
    console.log(weather);
    console.log(current);
  }

  return (
    <main className="
      min-h-screen
      bg-linear-to-br from-sky-300 via-blue-200 to-purple-300
    dark:from-slate-900 dark:via-indigo-900 dark:to-violet-800
      transition-colors duration-500
    "
    >
      <div className="mx-auto max-w-5xl px-4 py-8">
        <div className="my-5 flex justify-end">
          <ThemeToggle />
        </div>
        <SearchBar 
          searchValue={city}
          onSearchChange={handleSearchChange}
          onButtonClick={handleSearch}
        />
        <CurrentWeatherCard weather={currentWeatherData} />
        <HourlyForecast items={hourlyForecast} />
        <DailyForecast items={dailyForecast} />
      </div>
    </main>
  );
}