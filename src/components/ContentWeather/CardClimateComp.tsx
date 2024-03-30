import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { loadingCityAtom, placeAtom } from "@/app/atom";
import { useAtom } from "jotai";
import { URL_API } from "@/API/UrlApi";
// req axios import
import axios from "axios";
// Types Weather --------
import { WeatherData } from "@/types/WeatherData";
// Utils ---------
import { convertKelvinToCelsius } from "@/utils/convertKelvinToCelsius";
import { convertDate } from "@/utils/convertDate";
// Comps ----------
import { WeatherDetailsHours } from "@/components/ContentWeather/WeatherDetailsHours";
import { WeatherDetails } from "@/components/ContentWeather/WeatherDetails";
import { CreateContainer } from "@/utils/CreateContainer";
import WeatherIcon from "@/components/ContentWeather/WeatherIcon";
import { FaTemperatureHigh, FaTemperatureLow } from "react-icons/fa";
import { getDayOrNightIcon } from "@/utils/getDayOrNightIcon";
import { format } from "date-fns";
import { metersToKilometers } from "@/utils/metersToKilometers";
import { convertWindSpeed } from "@/utils/convertWindSpeed";

import { Alfa_Slab_One } from "next/font/google";

const myFontAlfa_Slab_One = Alfa_Slab_One({
  weight: "400",
  subsets: ["latin"],
});

export const CardClimateData = () => {
  const [place, setPlace] = useAtom(placeAtom);
  const [loadingCity] = useAtom(loadingCityAtom);

  const API_KEY = process.env.NEXT_PUBLIC_WEATHER_KEY;
  const URL = URL_API;
  const baseURL = `${URL}${place}&appid=${API_KEY}&cnt=56`;

  const { isLoading, error, data, refetch } = useQuery<WeatherData>(
    "repoData",
    async () => {
      const { data } = await axios.get(baseURL);
      return data;
    }
  );

  useEffect(() => {
    refetch();
  }, [place, refetch]);

  const firstData = data?.list[0];

  // console.log("error", error);

  const uniqueDates = [
    ...new Set(
      data?.list.map(
        (entry) => new Date(entry.dt * 1000).toISOString().split("T")[0]
      )
    ),
  ];

  // Filtering data to get the first entry after 6 AM for each unique date
  const firstDataForEachDate = uniqueDates.map((date) => {
    return data?.list.find((entry) => {
      const entryDate = new Date(entry.dt * 1000).toISOString().split("T")[0];
      const entryTime = new Date(entry.dt * 1000).getHours();
      return entryDate === date && entryTime >= 6;
    });
  });

  const formatedDate = firstData?.dt_txt.split(" ")[0] ?? "";
  console.log("Req data", data);

  if (isLoading)
    return (
      <div className="flex items-center min-h-screen justify-center">
        <p className="animate-bounce">Loading...</p>
      </div>
    );
  if (error)
    return (
      <div className="flex items-center min-h-screen justify-center">
        {/* @ts-ignore */}
        <p className="text-red-400">{error.message}</p>
      </div>
    );

  return (
    <div className="card w-[100%] flex flex-col gap-4  relative p-6 bg-gradient-to-br from-yellow-200 to-white shadow-xl rounded-lg transition-transform duration-500 ease-in-out transform hover:scale-105 cursor-pointer">
      <div className="card-header">
        <span className="font-semibold text-sm text-gray-600">
          {data?.city.name}-{data?.city.country}
        </span>
        <br />
        <span className="font-semibold text-sm text-gray-400">
          {convertDate(formatedDate)}
        </span>
      </div>
      <div className="weather-degree-infos flex flex-row items-center">
        <span className="temp flex flex-col  bottom-4 left-6 font-semibold text-7xl text-brown-900 gap-3">
          <div className="">
            {convertKelvinToCelsius(firstData?.main.temp ?? 296.37)}°
            <div className="temp-scale bottom-6 right-6 w-20 h-5 flex items-center justify-center bg-gray-100 rounded-lg">
              <span className="font-semibold text-xs text-gray-600">
                Celsius
              </span>
            </div>
          </div>
          <p className="flex gap-2 text-xs text-gray-500 pb-2 ">
            <div className="temp-min flex items-center">
              <FaTemperatureLow className="text-3xl" />
              <span className={myFontAlfa_Slab_One.className}>
                Min:
                {convertKelvinToCelsius(firstData?.main.temp_min ?? 0)}°
              </span>
            </div>
            <div className="temp-max flex items-center">
              <FaTemperatureHigh className="text-3xl" />
              <span className={myFontAlfa_Slab_One.className}>
                Max:
                {convertKelvinToCelsius(firstData?.main.temp_max ?? 0)}°
              </span>
            </div>
          </p>
        </span>
        <div className="flex flex-col items-center absolute top-9 right-12 ">
          <WeatherIcon
            className="h-20 w-20"
            iconName={getDayOrNightIcon(
              firstData?.weather[0].icon ?? "",
              firstData?.dt_txt ?? ""
            )}
          />
          <p className="flex items-center flex-col text-gray-500">
            <span className={myFontAlfa_Slab_One.className}>
              {firstData?.weather[0].description}
            </span>
          </p>
        </div>
      </div>
      <div className="details-weather">
        <WeatherDetailsHours data={data} />
      </div>
      <CreateContainer className="bg-yellow-300/80  px-6 gap-4 justify-between overflow-x-auto">
        <WeatherDetails
          sunrise={format(data?.city.sunrise ?? 1702949452, "H:mm")}
          sunset={format(data?.city.sunset ?? 1702517657, "H:mm")}
          visability={metersToKilometers(firstData?.visibility ?? 10000)}
          airPressure={`${firstData?.main.pressure} hPa`}
          humidity={`${firstData?.main.humidity}%`}
          windSpeed={convertWindSpeed(firstData?.wind.speed ?? 1.64)}
        />
      </CreateContainer>
    </div>
  );
};
