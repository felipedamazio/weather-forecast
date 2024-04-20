/** @format */
"use client";

// API URL
import { URL_API } from "@/API/UrlApi";
// Types Weather
import { WeatherData } from "@/types/WeatherData";
// req axios import
import axios from "axios";
// Use query import
import { useQuery } from "react-query";
// Comps ----------
import { Navbar } from "@/components/MainPageWeatherForecast/NavBar";
import { Content } from "@/components/MainPageWeatherForecast/Content";
import { Footer } from "@/components/MainPageWeatherForecast/Footer";
import { loadingCityAtom, placeAtom } from "../../app/atom";
import { useAtom } from "jotai";

export function MainPageWeatherForecast() {
  const API_KEY = process.env.NEXT_PUBLIC_WEATHER_KEY;
  const URL = URL_API;

  const [place, setPlace] = useAtom(placeAtom);
  // const [loadingCity] = useAtom(loadingCityAtom);

  const baseURL = `${URL}${place}&appid=${API_KEY}&cnt=56`;

  const { isLoading, error, data } = useQuery<WeatherData>(
    "repoData",
    async () => {
      const { data } = await axios.get(baseURL);
      return data;
    }
  );

  console.log("data", data);

  // tratament loading or error page request

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
  // charger total page
  return (
    <div className="flex flex-col gap-4 bg-gradient-to-t from-[#000000d6]  to-[#faffb1] min-h-screen ">
      <Navbar location={data?.city.name} data={data} />
      <main className="px-3 max-w-7xl mx-auto flex flex-col gap-9  w-full h-full pb-10 pt-4 ">
        <section className="space-y-4 ">
          <Content data={data} />
        </section>
      </main>
      <footer className="pb-10">
        <Footer />
      </footer>
    </div>
  );
}
