import * as maptilersdk from "@maptiler/sdk";
import { Alfa_Slab_One } from "next/font/google";

const myFontAlfa_Slab_One = Alfa_Slab_One({
  weight: "400",
  subsets: ["latin"],
});

export const Marker = (data, map) => {
  const MyMarker = new maptilersdk.Marker({ color: "#d72323d1" })
    .setLngLat([data?.city.coord.lon, data?.city.coord.lat])
    .setPopup(
      new maptilersdk.Popup().setHTML(
        `${data?.city.name}-${data?.city.country}`
      )
    )
    .addTo(map);
  return <>{MyMarker}</>;
};
