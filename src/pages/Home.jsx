import { useRef, useState } from 'react';
import SearchBar from '@/components/SearchBar';
import CurrentWeatherCard from "@/components/CurrentWeatherCard";
import HourlyForecast from "@/components/HourlyForecast";
import DailyForecast from "@/components/DailyForecast";
import ThemeToggle from '@/components/ThemeToggle';
import Toast from "@/components/Toast";
import { searchCity } from '@/api/locationApi';
import { getWeather } from '@/api/weatherApi';
import { getWeatherInfo } from "@/utils/weatherCodes";
import { getCitySuggestions } from '@/api/locationApi';

export default function Home() {
  const [city, setCity] = useState("");

  const [status, setStatus] = useState("idle");
  const [showLoading, setShowLoading] = useState(false);
  const loadingTimeoutRef = useRef(null);
  const [errorMessage, setErrorMessage] = useState("");

  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const toastTimeoutRef = useRef(null);

  const [suggestions, setSuggestions] = useState([]);
  const [isSuggestionsLoading, setIsSuggestionsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const debounceRef = useRef(null);

  const [currentWeatherData, setCurrentWeatherData] = useState(null);
  const [hourlyForecastData, setHourlyForecastData] = useState([]);
  const [dailyForecastData, setDailyForecastData] = useState([]);

  async function handleSearchChange(event) {
    const value = event.target.value;
    setCity(value);

    if (value.trim().length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    setIsSuggestionsLoading(true);
    
    debounceRef.current = setTimeout(async () => {
      const results = await getCitySuggestions(value);
      
      setSuggestions(results);
      setShowSuggestions(true);
      setIsSuggestionsLoading(false);
    }, 300);

    if (errorMessage) {
      setErrorMessage("");
    }
  }

  async function handleSearch() {
    const trimmedCity = city.trim();
    if (!trimmedCity) return;

    setErrorMessage("");
    setStatus("loading");
    setShowSuggestions(false);

    setShowLoading(false);

    if (loadingTimeoutRef.current) {
      clearTimeout(loadingTimeoutRef.current);
    }

    loadingTimeoutRef.current = window.setTimeout(() => {
      setShowLoading(true);
    }, 350);

    try {
      const data = await searchCity(trimmedCity);
      if (!data) {
        setErrorMessage("City not found");
        showErrorToast("City not found");
        setStatus("error");
        setShowLoading(false);
        return;
      }

      await fetchWeatherByLocation(data);
    }
    catch (error) {
      console.error("Error: ", error);
      setErrorMessage("Something went wrong. Please try again.");
      showErrorToast("Please try again.");
      setStatus("error");
    }
    finally {
      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current);
      }

      setShowLoading(false);
    }
  }

  async function fetchWeatherByLocation(location) {
    const weather = await getWeather(location.lat, location.lng);
    const timezone = weather.timezone;
    const current = weather.current;
    const hourly = weather.hourly;
    const daily = weather.daily;

    const weatherInfo = getWeatherInfo(current.weather_code, current.is_day);

    const nextCurrentWeatherData = {
      city: location.name,
      temperature: Math.round(current.temperature_2m),
      condition: weatherInfo.label,
      feelsLike: Math.round(current.apparent_temperature),
      humidity: current.relative_humidity_2m,
      windSpeed: Math.round(current.wind_speed_10m),
      dateTime: new Date().toLocaleString("en-US", {
        weekday: "long",
        hour: "numeric",
        minute: "2-digit",
        timeZone: timezone,
      }),
      iconName: weatherInfo.iconName,
    };

    const nowTimestamp = Date.parse(current.time);
    const startIndex = hourly.time.findIndex((time) => Date.parse(time) >= nowTimestamp);
    const safeStartIndex = startIndex >= 0 ? startIndex : 0;

    const nextHourlyForecastData = hourly.time
      .slice(safeStartIndex, safeStartIndex + 24)
      .map((time, index) => {
        const actualIndex = safeStartIndex + index;
        const info = getWeatherInfo(hourly.weather_code[actualIndex], hourly.is_day[actualIndex]);

        return {
          id: `${time}-${actualIndex}`,
          time: new Date(time).toLocaleTimeString("en-US", {
            hour: "numeric",
          }),
          temperature: Math.round(hourly.temperature_2m[actualIndex]),
          iconName: info.iconName,
        };
      });

    const nextDailyForecastData = daily.time.slice(0, 7).map((date, index) => {
      const info = getWeatherInfo(daily.weather_code[index], true);

      return {
        id: `${date}-${index}`,
        day: new Date(date).toLocaleDateString("en-US", {
          weekday: "long",
        }),
        minTemp: Math.round(daily.temperature_2m_min[index]),
        maxTemp: Math.round(daily.temperature_2m_max[index]),
        iconName: info.iconName,
      };
    });

    setCurrentWeatherData(nextCurrentWeatherData);
    setHourlyForecastData(nextHourlyForecastData);
    setDailyForecastData(nextDailyForecastData);
    setStatus("success");
    setCity("");
  }

  function showErrorToast(message) {
    setToastMessage(message);
    setShowToast(true);

    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }

    toastTimeoutRef.current = window.setTimeout(() => {
      setShowToast(false);
    }, 4000);
  }

  function handleCloseToast() {
    setShowToast(false);

    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }
  }

  async function onSuggestionsClick(suggestion) {
    setCity(suggestion.name);
    setShowSuggestions(false);
    setSuggestions([]);
    setErrorMessage("");
    setStatus("loading");

    setShowLoading(false);

    if (loadingTimeoutRef.current) {
      clearTimeout(loadingTimeoutRef.current);
    }

    loadingTimeoutRef.current = window.setTimeout(() => {
      setShowLoading(true);
    }, 350);

    try {
      await fetchWeatherByLocation(suggestion);
    }
    catch (error) {
      console.error("Error: ", error);
      setErrorMessage("Something went wrong. Please try again.");
      showErrorToast("Please try again.");
      setStatus("error");
    }
    finally {
      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current);
      }

      setShowLoading(false);
    }
  }

  function handleCloseSuggestions() {
    setShowSuggestions(false);
  }

  function handleOpenSuggestions() {
    setShowSuggestions(true);
  }

  return (
    <main className="
      min-h-screen
      bg-linear-to-br
      from-[rgb(120,180,220)]
      via-[rgb(110,170,225)]
      to-[rgb(110,150,230)]
      
      dark:from-slate-900
      dark:via-indigo-900
      dark:to-slate-800
      
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
          isLoading={status}

          suggestions={suggestions}
          showSuggestions={showSuggestions}
          isSuggestionsLoading={isSuggestionsLoading}
          onSuggestionsClick={onSuggestionsClick}
          onCloseSuggestions={handleCloseSuggestions}
          onOpenSuggestions={handleOpenSuggestions}
        />
        {status === "loading" && showLoading && (
          <div
            className="
              mt-8 rounded-4xl border border-white/30 dark:border-white/10
              bg-white/20 dark:bg-white/10
              p-8 text-center
              backdrop-blur-xl
              shadow-[0_8px_32px_rgba(0,0,0,0.08)]
            "
          >
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
              Loading weather...
            </h2>
            <p className="mt-3 text-gray-700 dark:text-white/70">
              We’re getting the latest forecast for you.
            </p>
          </div>
        )}
        {status === "idle" && !errorMessage && (
          <div
            className="
              mt-8 rounded-4xl border border-white/30 dark:border-white/10
              bg-white/20 dark:bg-white/10
              p-8 text-center
              backdrop-blur-xl
              shadow-[0_8px_32px_rgba(0,0,0,0.08)]
            "
          >
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
              Search for a city
            </h2>
            <p className="mt-3 text-gray-700 dark:text-white/70">
              Enter a city name above to see the current weather and forecast.
            </p>
          </div>
        )}
        {status === "success" && (
          <>
            <CurrentWeatherCard weather={currentWeatherData} />
            <HourlyForecast items={hourlyForecastData} />
            <DailyForecast items={dailyForecastData} />
          </>
        )}
      </div>
      <Toast
        message={toastMessage}
        isVisible={showToast}
        onClose={handleCloseToast}
      />
    </main>
  );
}