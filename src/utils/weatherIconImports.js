import clearDayAnimated from "@meteocons/svg/fill/clear-day.svg";
import partlyCloudyDayAnimated from "@meteocons/svg/fill/partly-cloudy-day.svg";
import overcastAnimated from "@meteocons/svg/fill/overcast.svg";
import fogAnimated from "@meteocons/svg/fill/fog.svg";
import drizzleAnimated from "@meteocons/svg/fill/drizzle.svg";
import rainAnimated from "@meteocons/svg/fill/rain.svg";
import snowAnimated from "@meteocons/svg/fill/snow.svg";
import thunderstormsAnimated from "@meteocons/svg/fill/thunderstorms.svg";
import thermometerAnimated from "@meteocons/svg/fill/thermometer.svg";
import clearNightAnimated from "@meteocons/svg/fill/clear-night.svg";
import partlyCloudyNightAnimated from "@meteocons/svg/fill/partly-cloudy-night.svg";

import clearDayStatic from "@meteocons/svg-static/fill/clear-day.svg";
import partlyCloudyDayStatic from "@meteocons/svg-static/fill/partly-cloudy-day.svg";
import clearNightStatic from "@meteocons/svg-static/fill/clear-night.svg";
import partlyCloudyNightStatic from "@meteocons/svg-static/fill/partly-cloudy-night.svg";
import overcastStatic from "@meteocons/svg-static/fill/overcast.svg";
import fogStatic from "@meteocons/svg-static/fill/fog.svg";
import drizzleStatic from "@meteocons/svg-static/fill/drizzle.svg";
import rainStatic from "@meteocons/svg-static/fill/rain.svg";
import snowStatic from "@meteocons/svg-static/fill/snow.svg";
import thunderstormsStatic from "@meteocons/svg-static/fill/thunderstorms.svg";
import thermometerStatic from "@meteocons/svg-static/fill/thermometer.svg";

const animatedFillIcons = {
  "clear-day": clearDayAnimated,
  "partly-cloudy-day": partlyCloudyDayAnimated,
  "clear-night": clearNightAnimated,
  "partly-cloudy-night": partlyCloudyNightAnimated,
  "overcast": overcastAnimated,
  "fog": fogAnimated,
  "drizzle": drizzleAnimated,
  "rain": rainAnimated,
  "snow": snowAnimated,
  "thunderstorms": thunderstormsAnimated,
  "thermometer": thermometerAnimated,
};

const staticFillIcons = {
  "clear-day": clearDayStatic,
  "partly-cloudy-day": partlyCloudyDayStatic,
  "clear-night": clearNightStatic,
  "partly-cloudy-night": partlyCloudyNightStatic,
  "overcast": overcastStatic,
  "fog": fogStatic,
  "drizzle": drizzleStatic,
  "rain": rainStatic,
  "snow": snowStatic,
  "thunderstorms": thunderstormsStatic,
  "thermometer": thermometerStatic,
};

export function getWeatherIconSrc(iconName, animated = true, style = "fill") {
  if (style !== "fill") {
    console.warn(`Style "${style}" is not supported yet. Falling back to "fill".`);
  }

  const iconsMap = animated ? animatedFillIcons : staticFillIcons;
  const iconSrc = iconsMap[iconName];

  if (!iconSrc) {
    console.warn(`Icon "${iconName}" was not found. Falling back to "clear-day".`);
    return animated ? animatedFillIcons["clear-day"] : staticFillIcons["clear-day"];
  }

  return iconSrc;
}