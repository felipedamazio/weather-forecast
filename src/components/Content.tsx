import { CardClimateData } from "@/components/ContentWeather/CardClimateComp";
import { Map } from "@/components/Maps/Map";

export const Content = () => {
  return (
    <div className="content flex justify-center items-center flex-col gap-4">      
      <CardClimateData />
      <Map />
    </div>
  );
};
