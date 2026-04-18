export const currentWeather = {
  city: "Riga",
  temperature: 14,
  condition: "Partly Cloudy",
  feelsLike: 13.3,
  humidity: 72,
  windSpeed: 5.2,
  dateTime: "Monday, 4:07 PM",
  iconName: "partly-cloudy-day",
};

export const hourlyForecast = [
  { id: 1, time: "12 AM", iconName: "overcast", temperature: 12 },
  { id: 2, time: "1 AM", iconName: "overcast", temperature: 11 },
  { id: 3, time: "2 AM", iconName: "overcast", temperature: 11 },
  { id: 4, time: "3 AM", iconName: "overcast", temperature: 10 },
  { id: 5, time: "4 AM", iconName: "overcast", temperature: 10 },
  { id: 6, time: "5 AM", iconName: "overcast", temperature: 11 },
  { id: 7, time: "6 AM", iconName: "overcast", temperature: 10 },
  { id: 8, time: "7 AM", iconName: "overcast", temperature: 10 },
  { id: 9, time: "8 AM", iconName: "overcast", temperature: 11 },
];

export const dailyForecast = [
  { id: 1, day: "Monday", iconName: "rain", condition: "Partly cloudy", minTemp: 9, maxTemp: 14 },
  { id: 2, day: "Tuesday", iconName: "rain", condition: "Sunny", minTemp: 10, maxTemp: 17 },
  { id: 3, day: "Wednesday", iconName: "rain", condition: "Rainy", minTemp: 8, maxTemp: 12 },
  { id: 4, day: "Thursday", iconName: "rain", condition: "Cloudy", minTemp: 7, maxTemp: 11 },
  { id: 5, day: "Friday", iconName: "rain", condition: "Partly cloudy", minTemp: 9, maxTemp: 15 },
  { id: 6, day: "Saturday", iconName: "rain", condition: "Sunny", minTemp: 11, maxTemp: 18 },
  { id: 7, day: "Sunday", iconName: "rain", condition: "Showers", minTemp: 10, maxTemp: 16 },
];