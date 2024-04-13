import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { loadingCityAtom, placeAtom } from "@/app/atom";
import { useAtom } from "jotai";
import { URL_API } from "@/API/UrlApi";
import axios from "axios";
import { WeatherData } from "@/types/WeatherData";
import { convertKelvinToCelsius } from "@/utils/convertKelvinToCelsius";
import { convertDate } from "@/utils/convertDate";
import { WeatherDetailsHours } from "@/components/ContentWeather/WeatherDetailsHours";
import { WeatherDetails } from "@/components/ContentWeather/WeatherDetails";
import { CreateContainer } from "@/components/CreateDefaultContainer/CreateContainer";
import WeatherIcon from "@/components/ContentWeather/WeatherIcon";
import { FaTemperatureHigh, FaTemperatureLow } from "react-icons/fa";
import { getDayOrNightIcon } from "@/utils/getDayOrNightIcon";
import { format, fromUnixTime } from "date-fns";
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

  const firstData = data?.list[1];

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
    <section className="flex flex-col w-full md:w-[60%] gap-4">
      <div className="card w-full flex flex-col gap-4  relative p-6 bg-gradient-to-tl from-[#a49aea]  to-[#fac5e2] shadow-xl rounded-lg transition-transform duration-500 ease-in-out transform cursor-pointer">
        <div className="card-header">
          <span className="font-semibold text-sm text-gray-800">
            {data?.city.name}-{data?.city.country}
          </span>
          <br />
          <span className="font-semibold text-sm text-gray-500">
            {convertDate(formatedDate)}
          </span>
        </div>
        <div className="weather-degree-infos flex flex-row items-center">
          <span className="temp flex flex-col  bottom-4 left-6 font-semibold text-7xl text-brown-900 gap-3">
            <div className="">
              {convertKelvinToCelsius(firstData?.main.temp ?? 0)}°
              <div className="temp-scale bottom-6 right-6 w-20 h-5 flex items-center justify-center bg-gray-100 rounded-lg">
                <span className="font-semibold text-xs text-gray-600">
                  Celsius
                </span>
              </div>
            </div>
            <div className="flex gap-2 text-xs text-gray-500 pb-2 ">
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
            </div>
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
            sunrise={format(
              fromUnixTime(data?.city.sunrise ?? 1702517657),
              "H:mm"
            )}
            sunset={format(
              fromUnixTime(data?.city.sunset ?? 1702517657),
              "H:mm"
            )}
            visability={metersToKilometers(firstData?.visibility ?? 10000)}
            airPressure={`${firstData?.main.pressure} hPa`}
            humidity={`${firstData?.main.humidity}%`}
            windSpeed={convertWindSpeed(firstData?.wind.speed ?? 1.64)}
          />
        </CreateContainer>
      </div>
    </section>
  );
};
