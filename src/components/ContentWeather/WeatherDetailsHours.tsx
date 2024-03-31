import { WeatherData } from "@/types/WeatherData";
import { format, parseISO } from "date-fns";
// Utils -------
import { convertKelvinToCelsius } from "@/utils/convertKelvinToCelsius";
import { getDayOrNightIcon } from "@/utils/getDayOrNightIcon";
// Comps -------
import WeatherIcon from "@/components/ContentWeather/WeatherIcon";

type Props = {
  data?: WeatherData;
};

export const WeatherDetailsHours = ({ data }: Props) => {
  return (
    <>
      <div className="flex gap-2 sm:gap-8 overflow-x-auto w-full justify-between pr-3">
        {data?.list.map((d, i) => (
          <div
            key={i}
            className="flex flex-col justify-between gap-2 items-center text-xs font-semibold "
          >
            <p className="whitespace-nowrap">
              {format(parseISO(d.dt_txt), "h:mm a")}
            </p>
            <WeatherIcon
              className="h-14 w-14"
              iconName={getDayOrNightIcon(d.weather[0].icon, d.dt_txt)}
            />
            <p>{convertKelvinToCelsius(d?.main.temp ?? 0)}°</p>
          </div>
        ))}
      </div>
    </>
  );
};
