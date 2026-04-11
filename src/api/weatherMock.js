export const currentWeather = {
  city: "Riga",
  temperature: 14,
  condition: "Partly Cloudy",
  feelsLike: 13.3,
  humidity: 72,
  windSpeed: 5.2,
  dateTime: "Monday, 4:07 PM",
  icon: "⛅",
};

export const hourlyForecast = [
  { id: 1, time: "12 AM", icon: "☁️", temperature: 12 },
  { id: 2, time: "1 AM", icon: "🌙", temperature: 11 },
  { id: 3, time: "2 AM", icon: "☁️", temperature: 11 },
  { id: 4, time: "3 AM", icon: "🌥️", temperature: 10 },
  { id: 5, time: "4 AM", icon: "☁️", temperature: 10 },
  { id: 6, time: "5 AM", icon: "⛅", temperature: 11 },
  { id: 7, time: "6 AM", icon: "🌥️", temperature: 10 },
  { id: 8, time: "7 AM", icon: "☁️", temperature: 10 },
  { id: 9, time: "8 AM", icon: "⛅", temperature: 11 },
];

export const dailyForecast = [
  { id: 1, day: "Monday", icon: "⛅", condition: "Partly cloudy", minTemp: 9, maxTemp: 14 },
  { id: 2, day: "Tuesday", icon: "☀️", condition: "Sunny", minTemp: 10, maxTemp: 17 },
  { id: 3, day: "Wednesday", icon: "🌧️", condition: "Rainy", minTemp: 8, maxTemp: 12 },
  { id: 4, day: "Thursday", icon: "☁️", condition: "Cloudy", minTemp: 7, maxTemp: 11 },
  { id: 5, day: "Friday", icon: "⛅", condition: "Partly cloudy", minTemp: 9, maxTemp: 15 },
  { id: 6, day: "Saturday", icon: "☀️", condition: "Sunny", minTemp: 11, maxTemp: 18 },
  { id: 7, day: "Sunday", icon: "🌦️", condition: "Showers", minTemp: 10, maxTemp: 16 },
];