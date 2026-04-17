const WEATHER_CODES = {
  0: { label: "Clear sky", icon: "☀️" },
  1: { label: "Mainly clear", icon: "🌤️" },
  2: { label: "Partly cloudy", icon: "⛅" },
  3: { label: "Overcast", icon: "☁️" },
  45: { label: "Fog", icon: "🌫️" },
  48: { label: "Depositing rime fog", icon: "🌫️" },
  51: { label: "Light drizzle", icon: "🌦️" },
  61: { label: "Rain", icon: "🌧️" },
  71: { label: "Snow", icon: "❄️" },
};

export function getWeatherInfo(code) {
  return WEATHER_CODES[code] || {
    label: "Unknown",
    icon: "❓",
  };
}