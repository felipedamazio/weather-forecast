import { CardClimateData } from "@/components/ContentWeather/CardClimateComp";
import { Map } from "@/components/Maps/Map";
import { WeatherForecats7Days } from "@/components/ContentWeather/WeatherForecats7Days";
import { WeatherData } from "@/types/WeatherData";

type Props = {
  data?: WeatherData;
};

export const Content = ({ data }: Props) => {
  return (
    <div className="content flex justify-center items-center flex-col gap-4">
      <div className="w-full flex-col md:flex-row flex gap-4">
        <CardClimateData />
        <Map data={data} />
      </div>
      <WeatherForecats7Days data={data} />
    </div>
  );
};
