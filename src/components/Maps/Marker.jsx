import * as maptilersdk from "@maptiler/sdk";
import { Alfa_Slab_One } from "next/font/google";
import { convertKelvinToCelsius } from "@/utils/convertKelvinToCelsius";

const myFontAlfa_Slab_One = Alfa_Slab_One({
  weight: "400",
  subsets: ["latin"],
});

export const Marker = (data, map) => {
  const firstData = data?.list[1];

  const MyMarker = new maptilersdk.Marker({ color: "#d72323d1" })
    .setLngLat([data?.city.coord.lon, data?.city.coord.lat])
    .setPopup(
      new maptilersdk.Popup().setHTML(
        `<span>${data?.city.name}-${data?.city.country} </span>  
        <span class='degree'>${convertKelvinToCelsius(
          firstData?.main.temp ?? 0
        )}°c</span>`
      )
    )
    .addTo(map);
  return MyMarker;
};
