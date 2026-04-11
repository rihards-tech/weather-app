import SearchBar from '@/components/SearchBar';
import CurrentWeatherCard from "@/components/CurrentWeatherCard";
import HourlyForecast from "@/components/HourlyForecast";
import DailyForecast from "@/components/DailyForecast";
import { currentWeather, hourlyForecast, dailyForecast } from "@/api/weatherMock";

export default function Home() {
  return (
    <main className="min-h-screen bg-linear-to-br from-sky-300 via-blue-200 to-purple-300">
      <div className="mx-auto max-w-5xl px-4 py-8">
        <SearchBar />
        <CurrentWeatherCard weather={currentWeather} />
        <HourlyForecast items={hourlyForecast} />
        <DailyForecast items={dailyForecast} />
      </div>
    </main>
  );
}