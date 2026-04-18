import { getWeatherIconSrc } from "@/utils/weatherIconImports";

export default function WeatherIcon(props) {
  const {
    iconName,
    animated = true,
    style = "fill",
    alt = "",
    className = "",
  } = props;

  const src = getWeatherIconSrc(iconName, animated, style);

  return (
    <img
      src={src}
      alt={alt}
      className={`
        ${className}
        drop-shadow-[0_2px_6px_rgba(0,0,0,0.15)]
        dark:drop-shadow-[0_2px_6px_rgba(0,0,0,0.4)]
      `}
      draggable="false"
    />
  );
}