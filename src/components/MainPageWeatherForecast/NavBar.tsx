import React from "react";
import { useState } from "react";
// API URL
import { URL_API_2 } from "@/API/UrlApi";
import { URL_API_3 } from "@/API/UrlApi";
//Comps----------
import { SearchBox } from "@/components/ContentWeather/SearchBox";
import { Map } from "@/components/Maps/Map";
import { WeatherData } from "@/types/WeatherData";

// import { handleCurrentLocation } from "@/components/Location/handleCurrentLocation";
// Icons ----
import { MdOutlineLocationOn, MdWbSunny } from "react-icons/md";
import { MdMyLocation } from "react-icons/md";
import { loadingCityAtom, placeAtom } from "@/app/atom";
import { useAtom } from "jotai";

//Request axios import
import axios from "axios";
import { Clock } from "@/components/CurrentHour/Clock";

type Props = { location?: string; data?: WeatherData };

export function Navbar({ location, data }: Props) {
  const [city, setCity] = useState("");
  const [error, setError] = useState("");
  //
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [place, setPlace] = useAtom(placeAtom);
  const [_, setLoadingCity] = useAtom(loadingCityAtom);

  const API_KEY = process.env.NEXT_PUBLIC_WEATHER_KEY;
  const URL = URL_API_2;

  async function handleInputChang(value: string) {
    setCity(value);
    const baseURL = `${URL}${value}&appid=${API_KEY}`;
    if (value.length >= 3) {
      try {
        const response = await axios.get(baseURL);

        const suggestions = response.data.list.map((item: any) => item.name);
        const noRepeatLocale = [...new Set(suggestions)];
        console.log(noRepeatLocale);

        setSuggestions((suggestions));
        setError("");
        setShowSuggestions(true);
      } catch (error) {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }

  function handleSuggestionClick(value: string) {
    setCity(value);
    setShowSuggestions(false);
  }

  function handleSubmiSearch(e: React.FormEvent<HTMLFormElement>) {
    setLoadingCity(true);
    e.preventDefault();
    if (suggestions.length == 0) {
      setError("Location not found");
      setLoadingCity(false);
    } else {
      setError("");
      setTimeout(() => {
        setLoadingCity(false);
        setPlace(city);
        setShowSuggestions(false);
        <Map data={data} />;
      }, 500);
    }
  }

  function handleCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (postiion) => {
        const { latitude, longitude } = postiion.coords;
        const URL = URL_API_3;
        try {
          setLoadingCity(true);
          const response = await axios.get(
            `${URL}lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
          );
          setTimeout(() => {
            setLoadingCity(false);
            setPlace(response.data.name);
          }, 500);
        } catch (error) {
          setLoadingCity(false);
        }
      });
    }
  }
  const newDate = new Date();
  return (
    <>
      <nav className="shadow-sm  sticky top-0 left-0 z-50 bg-white">
        <div className="h-[80px]     w-full    flex   justify-between items-center  max-w-7xl px-3 mx-auto">
          <p className="flex items-center justify-center gap-2  ">
            <span className="text-gray-500 text-3xl">Weather</span>
            <MdWbSunny className="text-3xl mt-1 text-yellow-300" />
          </p>
          <section>
            <div className="relative hidden md:flex flex-col">
              <Clock time={newDate.getTime()} />
            </div>
          </section>
          <section className="flex gap-[0.310rem] items-center">
            <MdMyLocation
              title="Your Current Location"
              onClick={handleCurrentLocation}
              className="text-2xl  text-gray-400 hover:opacity-80 cursor-pointer"
            />
            <MdOutlineLocationOn className="text-3xl" />
            <p className="text-slate-900/80 text-sm"> {location} </p>
            <div className="relative hidden md:flex">
              <SearchBox
                value={city}
                onSubmit={handleSubmiSearch}
                onChange={(e) => handleInputChang(e.target.value)}
              />
              <SuggetionBox
                {...{
                  showSuggestions,
                  suggestions,
                  handleSuggestionClick,
                  error,
                }}
              />
            </div>
          </section>
        </div>
      </nav>
      <section className="flex  max-w-7xl px-3 md:hidden ">
        <div className="relative ">
          <SearchBox
            value={city}
            onSubmit={handleSubmiSearch}
            onChange={(e) => handleInputChang(e.target.value)}
          />
          <SuggetionBox
            {...{
              showSuggestions,
              suggestions,
              handleSuggestionClick,
              error,
            }}
          />
        </div>
      </section>
      <section className="flex  max-w-7xl px-3 md:hidden">
        <div className="relative flex justify-center items-center gap-2 flex-row">
          <Clock time={newDate.getTime()} />
        </div>
      </section>
    </>
  );
}

function SuggetionBox({
  showSuggestions,
  suggestions,
  handleSuggestionClick,
  error,
}: {
  showSuggestions: boolean;
  suggestions: string[];
  handleSuggestionClick: (item: string) => void;
  error: string;
}) {
  return (
    <>
      {((showSuggestions && suggestions.length > 1) || error) && (
        <ul className="mb-4 bg-white absolute border top-[44px] left-0 border-gray-300 rounded-md min-w-[200px]  flex flex-col gap-1 py-2 px-2 z-10">
          {error && suggestions.length < 1 && (
            <li className="text-red-500 p-1 "> {error}</li>
          )}
          {suggestions.map((item, i) => (
            <li
              key={i}
              onClick={() => handleSuggestionClick(item)}
              className="cursor-pointer p-1 rounded   hover:bg-gray-200"
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
