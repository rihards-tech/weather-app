const WEATHER_CODES = {
  0: { label: "Clear sky", iconName: "clear-day" },
  1: { label: "Mainly clear", iconName: "clear-day" },
  2: { label: "Partly cloudy", iconName: "partly-cloudy-day" },
  3: { label: "Overcast", iconName: "overcast" },

  45: { label: "Fog", iconName: "fog" },
  48: { label: "Rime fog", iconName: "fog" },

  51: { label: "Light drizzle", iconName: "drizzle" },
  53: { label: "Moderate drizzle", iconName: "drizzle" },
  55: { label: "Dense drizzle", iconName: "drizzle" },

  56: { label: "Freezing drizzle", iconName: "drizzle" },
  57: { label: "Heavy freezing drizzle", iconName: "drizzle" },

  61: { label: "Slight rain", iconName: "rain" },
  63: { label: "Moderate rain", iconName: "rain" },
  65: { label: "Heavy rain", iconName: "rain" },

  66: { label: "Freezing rain", iconName: "rain" },
  67: { label: "Heavy freezing rain", iconName: "rain" },

  71: { label: "Slight snow", iconName: "snow" },
  73: { label: "Moderate snow", iconName: "snow" },
  75: { label: "Heavy snow", iconName: "snow" },

  77: { label: "Snow grains", iconName: "snow" },

  80: { label: "Rain showers", iconName: "rain" },
  81: { label: "Heavy rain showers", iconName: "rain" },
  82: { label: "Violent rain showers", iconName: "rain" },

  85: { label: "Snow showers", iconName: "snow" },
  86: { label: "Heavy snow showers", iconName: "snow" },

  95: { label: "Thunderstorm", iconName: "thunderstorms" },
  96: { label: "Thunderstorm with hail", iconName: "thunderstorms" },
  99: { label: "Heavy thunderstorm with hail", iconName: "thunderstorms" },
};

function resolveWeatherIconName(iconName, isDay = true) {
  if (iconName === "clear-day") {
    return isDay ? "clear-day" : "clear-night";
  }

  if (iconName === "partly-cloudy-day") {
    return isDay ? "partly-cloudy-day" : "partly-cloudy-night";
  }

  return iconName;
}

export function getWeatherInfo(code, isDay = true) {
  const weatherInfo = WEATHER_CODES[code] || {
    label: "Unknown",
    iconName: "thermometer",
  };

  return {
    ...weatherInfo,
    iconName: resolveWeatherIconName(weatherInfo.iconName, isDay),
  };
}