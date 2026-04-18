import DailyForecastItem from "@/components/DailyForecastItem";

export default function DailyForecast(props) {
  const {
    items,
  } = props;
  return (
    <section
      className={`
        rounded-4xl
        border border-white/30 dark:border-white/10
        bg-white/25 dark:bg-white/10
        p-5
        my-15
        backdrop-blur-xl
        shadow-[0_8px_32px_rgba(0,0,0,0.08)]
        transition-all duration-300 delay-500
        motion-safe:animate-[cardEnter_1150ms_cubic-bezier(0.22,1,0.36,1)_600ms_both]
      `}
    >
      <div className="space-y-3">
        {items.map((item) => (
          <DailyForecastItem key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}