import WeatherIcon from '@/components/WeatherIcon';

export default function DailyForecastItem(props) {
  const {
    item,
  } = props;

  return (
    <article
      className="
        flex items-center justify-between
        rounded-3xl
        border border-white/25 dark:border-white/10
        bg-white/20 dark:bg-white/10
        px-4 py-4
        text-gray-800 dark:text-white
        backdrop-blur-lg
        shadow-[0_4px_20px_rgba(0,0,0,0.05)]
        transition-all duration-200
      "
    >
      <p className="min-w-27.5 text-base font-semibold">
        {item.day}
      </p>

      <div className="flex justify-center">
        <WeatherIcon
          iconName={item.iconName}
          animated={false}
          style="fill"
          className="h-12 w-12"
        />
      </div>

      <div className="min-w-22.5 text-right">
        <span className="text-sm text-gray-500 dark:text-white/60">
          {item.minTemp}°
        </span>
        <span className="ml-3 text-base font-semibold">
          {item.maxTemp}°
        </span>
      </div>
    </article>
  );
}