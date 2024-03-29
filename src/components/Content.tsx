import { CardClimateData } from "@/components/ContentWeather/CardClimateComp";
import { Map } from "@/components/Maps/Map";
import { WeatherData } from "@/types/WeatherData";

type Props = {
  data?: WeatherData;
};

export const Content = ({ data }: Props) => {
  return (
    <div className="content flex justify-center items-center flex-col gap-4">
      <CardClimateData />
      <Map data={data} />
    </div>
  );
};
