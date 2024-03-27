import { useEffect } from "react";
import { useQuery } from "react-query";
import { loadingCityAtom, placeAtom } from "@/app/atom";
import { useAtom } from "jotai";
import { URL_API } from "@/API/UrlApi";
import axios from "axios";
// Types Weather --------
import { WeatherData } from "@/types/WeatherData";
// Utils ---------
import { convertKelvinToCelsius } from "@/utils/convertKelvinToCelsius";
// Comps ----------


export const CardClimateData = () => {
  const [place, setPlace] = useAtom(placeAtom);
  const [loadingCity] = useAtom(loadingCityAtom);

  const API_KEY = process.env.NEXT_PUBLIC_WEATHER_KEY;
  const URL = URL_API;
  const baseURL = `${URL}${place}&appid=${API_KEY}&cnt=56`;

  const { isLoading, error, data, refetch } = useQuery<WeatherData>(
    "repoData",
    async () => {
      const { data } = await axios.get(
        `${URL}${place}&appid=${API_KEY}&cnt=56`
      );
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
  console.log("data", data);

  return (
    <div className="card w-96 h-64 relative p-6 bg-gradient-to-br from-yellow-200 to-white shadow-xl rounded-lg transition-transform duration-500 ease-in-out transform hover:scale-105 cursor-pointer">
      <div className="card-header">
        <span className="font-semibold text-sm text-gray-600">
          {data?.city.name}-{data?.city.country}
        </span>
        <br />
        <span className="font-semibold text-sm text-gray-400"> March 13</span>
      </div>

      <span className="temp absolute bottom-4 left-6 font-semibold text-7xl text-brown-900">
        {convertKelvinToCelsius(firstData?.main.temp ?? 296.37)}°
        <p className="text-xs space-x-2">
          <span>
            {convertKelvinToCelsius(firstData?.main.temp_min ?? 0)}
            °↓{" "}
          </span>
          <span>
            {" "}
            {convertKelvinToCelsius(firstData?.main.temp_max ?? 0)}
            °↑
          </span>
        </p>
      </span>      
      <div className="temp-scale absolute bottom-6 right-6 w-28 h-10 flex items-center justify-center bg-gray-100 rounded-lg">
        <span className="font-semibold text-xs text-gray-600">Celsius</span>
      </div>
    </div>
  );
};
