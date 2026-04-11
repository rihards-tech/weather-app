export default function DailyForecastItem(props) {
  const {
    item,
  } = props;

  return (
    <article
      className="
        flex items-center justify-between
        rounded-3xl
        border border-white/25
        bg-white/20
        px-4 py-4
        text-gray-800
        backdrop-blur-lg
        shadow-[0_4px_20px_rgba(0,0,0,0.05)]
        transition-all duration-200
        hover:bg-white/25
      "
    >
      <p className="min-w-27.5 text-base font-semibold">
        {item.day}
      </p>

      <div className="text-3xl">
        {item.icon}
      </div>

      <div className="min-w-22.5 text-right">
        <span className="text-sm text-gray-500">
          {item.minTemp}°
        </span>
        <span className="ml-3 text-base font-semibold">
          {item.maxTemp}°
        </span>
      </div>
    </article>
  );
}