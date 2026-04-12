export default function CurrentWeatherCard(props) {
  const {
    weather,
  } = props;
  return (
    <section
      className="
        max-w-xl mx-auto
        m-auto
        my-10
        rounded-4xl
        border border-white/30 dark:border-white/10
        bg-white/25 dark:bg-white/10
        p-6
        backdrop-blur-xl
        shadow-[0_8px_32px_rgba(0,0,0,0.08)]
        transition-colors duration-300
      "
    >
      <div className="flex items-center justify-between gap-6">
        <div className="text-gray-800 dark:text-white">
          <h2 className="text-3xl font-semibold tracking-tight">
            {weather.city}
          </h2>

          <p className="mt-4 text-7xl font-semibold leading-none">
            {weather.temperature}°
          </p>

          <p className="mt-5 text-lg text-gray-700 dark:text-white/60">
            {weather.dateTime}
          </p>

          <div className="mt-6 space-y-2 text-base text-gray-700 dark:text-white/70">
            <p>Feels like {weather.feelsLike}°</p>
            <p>Humidity {weather.humidity}%</p>
            <p>Wind {weather.windSpeed} m/s</p>
          </div>
        </div>

        <div className="flex min-w-40 flex-col items-center justify-center text-center text-gray-800 dark:text-white">
          <div className="text-9xl">{weather.icon}</div>
          <p className="mt-4 text-2xl font-semibold dark:text-white">
            {weather.condition}
          </p>
        </div>
      </div>
    </section>
  );
}