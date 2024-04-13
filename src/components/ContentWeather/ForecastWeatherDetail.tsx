/** @format */

import React from "react";
import { CreateContainer } from "@/components/CreateDefaultContainer/CreateContainer";
import WeatherIcon from "./WeatherIcon";
import { WeatherDetails } from "./WeatherDetails";
import { convertKelvinToCelsius } from "@/utils/convertKelvinToCelsius";
import { WeatherDetailProps } from "@/types/WeatherDetailProps";

export interface ForecastWeatherDetailProps extends WeatherDetailProps {
  weatehrIcon: string;
  date: string;
  day?: string;
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  description: string;
}

export function ForecastWeatherDetail(props: ForecastWeatherDetailProps) {
  const {
    weatehrIcon = "02d",
    date = "19.09",
    day = "Tuesday",
    temp,
    feels_like,
    temp_min,
    temp_max,
    description,
  } = props;
  return (
    <CreateContainer className="gap-4">
      <section className=" flex gap-4 items-center pl-4  ">
        <div className=" flex flex-col gap-1 items-center">
          <WeatherIcon iconName={weatehrIcon} />
          <p>{date}</p>
          <p className="text-sm">{day} </p>
        </div>
        <div className="flex flex-col pl-4">
          <span className="text-5xl">{convertKelvinToCelsius(temp ?? 0)}°</span>
          <p className="text-xs space-x-1 whitespace-nowrap">
            <span> Feels like</span>
            <span>{convertKelvinToCelsius(feels_like ?? 0)}°</span>
          </p>
          <p className="capitalize"> {description}</p>
        </div>
      </section>
      <section className=" overflow-x-auto flex justify-between gap-4 px-4  w-full pr-10">
        <WeatherDetails {...props} />
      </section>
    </CreateContainer>
  );
}
