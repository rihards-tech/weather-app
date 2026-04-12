import DailyForecastItem from "@/components/DailyForecastItem";

export default function DailyForecast(props) {
  const {
    items,
  } = props;
  return (
    <section
      className="
        rounded-4xl
        border border-white/30 dark:border-white/10
        bg-white/25 dark:bg-white/10
        p-5
        my-15
        backdrop-blur-xl
        shadow-[0_8px_32px_rgba(0,0,0,0.08)]
        transition-colors duration-300
      "
    >
      <div className="space-y-3">
        {items.map((item) => (
          <DailyForecastItem key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}