import { ForecastWeatherDetail } from "@/components/ContentWeather/ForecastWeatherDetail";
import { WeatherData } from "@/types/WeatherData";
import { format, parseISO, fromUnixTime } from "date-fns";
import { metersToKilometers } from "@/utils/metersToKilometers";
import { convertWindSpeed } from "@/utils/convertWindSpeed";
import { Alfa_Slab_One } from "next/font/google";
import { convertDate } from "@/utils/convertDate";
const myFontAlfa_Slab_One = Alfa_Slab_One({
  weight: "400",
  subsets: ["latin"],
});

type Props = {
  data?: WeatherData;
};

export const WeatherForecats7Days = ({ data }: Props) => {
  const uniqueDates = [
    ...new Set(
      data?.list.map(
        (entry) => new Date(entry.dt * 1000).toISOString().split("T")[0]
      )
    ),
  ];

  const firstDataForEachDate = uniqueDates.map((date) => {
    return data?.list.find((entry) => {
      const entryDate = new Date(entry.dt * 1000).toISOString().split("T")[0];
      const entryTime = new Date(entry.dt * 1000).getHours();
      return entryDate === date && entryTime >= 8;
    });
  });

  return (
    <>
      {/* 7 day forcast data  */}
      <section className="flex w-full flex-col gap-4  ">
        <p className="text-lg text-gray-500">
          <span className={myFontAlfa_Slab_One.className}>
            Forcast (7 days)
          </span>
        </p>
        {firstDataForEachDate.map((d, i) => (
          <ForecastWeatherDetail
            key={i}
            description={d?.weather[0].description ?? ""}
            weatehrIcon={d?.weather[0].icon ?? "01d"}
            date={d ? format(parseISO(d.dt_txt), "dd.MM") : ""}
            day={
              d
                ? convertDate(d.dt_txt.split(" ").shift() ?? "week-day")
                    .split(",")
                    .shift()
                : ""
            }
            feels_like={d?.main.feels_like ?? 0}
            temp={d?.main.temp ?? 0}
            temp_max={d?.main.temp_max ?? 0}
            temp_min={d?.main.temp_min ?? 0}
            airPressure={`${d?.main.pressure} hPa `}
            humidity={`${d?.main.humidity}% `}
            sunrise={format(
              fromUnixTime(data?.city.sunrise ?? 1702517657),
              "H:mm"
            )}
            sunset={format(
              fromUnixTime(data?.city.sunset ?? 1702517657),
              "H:mm"
            )}
            visability={`${metersToKilometers(d?.visibility ?? 10000)} `}
            windSpeed={`${convertWindSpeed(d?.wind.speed ?? 1.64)} `}
          />
        ))}
      </section>
    </>
  );
};
