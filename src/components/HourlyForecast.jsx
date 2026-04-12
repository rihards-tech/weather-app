import HourlyForecastItem from "@/components/HourlyForecastItem";

export default function HourlyForecast(props) {
  const {
    items
  } = props;

  return (
    <section
      className="
        rounded-4xl
        border border-white/30 dark:border-white/10
        bg-white/25 dark:bg-white/10
        p-5
        backdrop-blur-xl
        shadow-[0_8px_32px_rgba(0,0,0,0.08)]
        transition-colors duration-300
      "
    >
      <div
        className="
          flex gap-4 overflow-x-auto
          pb-2
          pr-2
          no-scrollbar
          snap-x snap-mandatory
          scroll-pl-1
          scroll-touch
        "
      >
        {items.map((item) => (
          <HourlyForecastItem key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}