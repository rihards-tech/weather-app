import SearchBar from '@/components/SearchBar';
import CurrentWeatherCard from "@/components/CurrentWeatherCard";
import HourlyForecast from "@/components/HourlyForecast";
import DailyForecast from "@/components/DailyForecast";
import ThemeToggle from '@/components/ThemeToggle';
import { currentWeather, hourlyForecast, dailyForecast } from "@/api/weatherMock";

export default function Home() {
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
        <SearchBar />
        <CurrentWeatherCard weather={currentWeather} />
        <HourlyForecast items={hourlyForecast} />
        <DailyForecast items={dailyForecast} />
      </div>
    </main>
  );
}