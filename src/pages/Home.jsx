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
  const [hourlyForecastData, setHourlyForecastData] = useState(hourlyForecast);
  const [dailyForecastData, setDailyForecastData] = useState(dailyForecast);

  function handleSearchChange(event) {
    setCity(event.target.value);
  }

  async function handleSearch() {
    const trimmedCity = city.trim();
    if(!trimmedCity) return;

    const data = await searchCity(trimmedCity);
    if (!data) return;

    const weather = await getWeather(data.lat, data.lng);
    const timezone = weather.timezone;
    const current = weather.current;
    const hourly = weather.hourly;
    const daily = weather.daily;

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
        timeZone: timezone,
      }),
      icon: current.is_day ? "☀️" : "🌙",
    };

    const nowTimestamp = Date.parse(current.time);
    const startIndex = hourly.time.findIndex((time) => Date.parse(time) >= nowTimestamp);
    const safeStartIndex = startIndex >= 0 ? startIndex : 0;

    const nextHourlyForecastData = hourly
    .time
    .slice(safeStartIndex, safeStartIndex + 24).map((time, index) => {
      const actualIndex = safeStartIndex + index;

      return {
        id: `${time}-${actualIndex}`,
        time: new Date(time).toLocaleTimeString("en-US", {
          hour: "numeric",
        }),
        temperature: Math.round(hourly.temperature_2m[actualIndex]),
        icon: hourly.weather_code[actualIndex],
      };
    });

    const nextDailyForecastData = daily.time.slice(0, 7).map((date, index) => {
      return {
        id: `${date}-${index}`,
        day: new Date(date).toLocaleDateString("en-US", {
          weekday: "long",
        }),
        minTemp: Math.round(daily.temperature_2m_min[index]),
        maxTemp: Math.round(daily.temperature_2m_max[index]),
        icon: daily.weather_code[index],
      };
    });

    setCurrentWeatherData(nextCurrentWeatherData);
    setHourlyForecastData(nextHourlyForecastData);
    setDailyForecastData(nextDailyForecastData);
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
        <HourlyForecast items={hourlyForecastData} />
        <DailyForecast items={dailyForecastData} />
      </div>
    </main>
  );
}