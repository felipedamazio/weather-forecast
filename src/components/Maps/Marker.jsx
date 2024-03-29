import * as maptilersdk from "@maptiler/sdk";

export const Marker = (data, map ) => {
  const MyMarker = new maptilersdk.Marker({ color: "#FF0000" })
    .setLngLat([data?.city.coord.lon, data?.city.coord.lat])
    .setPopup(
      new maptilersdk.Popup().setHTML(
        `${data?.city.name}-${data?.city.country}`
      )
    )
    .addTo(map);
  return <>{MyMarker}</>;
};
