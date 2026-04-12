export default function HourlyForecastItem({ item }) {
  return (
    <article
      className="
        min-w-27.5
        snap-start
        rounded-[28px]
        border border-white/20 dark:border-white/10
        bg-white/20 dark:bg-white/10
        px-4 py-5
        text-center
        backdrop-blur-lg
        shadow-[0_4px_20px_rgba(0,0,0,0.06)]
        transition-all duration-300
      "
    >
      <p className="text-lg font-semibold text-gray-700 dark:text-white/70">
        {item.time}
      </p>

      <div className="my-4 text-5xl">
        {item.icon}
      </div>

      <p className="text-3xl font-semibold text-gray-800 dark:text-white">
        {item.temperature}°
      </p>
    </article>
  );
}