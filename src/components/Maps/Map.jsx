import React, { useRef, useEffect, useState } from "react";
import * as maptilersdk from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";
import { convertKelvinToCelsius } from "@/utils/convertKelvinToCelsius";
import { FaTemperatureHigh, FaTemperatureLow } from "react-icons/fa";

export function Map({ data }) {
  const API_MAP_KEY = process.env.NEXT_PUBLIC_API_MAPTILER_KEY;

  const mapContainer = useRef(null);
  const map = useRef(null);
  const marker = useRef(null);
  const markerLocationClick = useRef(null);
  const position = { lng: data?.city.coord.lon, lat: data?.city.coord.lat };
  const [zoom] = useState(11);
  const firstData = data?.list[1];

  maptilersdk.config.apiKey = API_MAP_KEY;

  try {
    useEffect(() => {
      !map.current
        ? (map.current = new maptilersdk.Map({
            container: mapContainer.current,
            style: maptilersdk.MapStyle.STREETS,
            center: [position.lng, position.lat],
            zoom: zoom,
          }))
        : map.current.panTo([position.lng, position.lat], { duration: 5000 });

      // Add a new marker

      if (marker.current) marker.current.remove();

      marker.current = new maptilersdk.Marker({ color: "#d72323d1" })
        .setLngLat([position.lng, position.lat])
        .setPopup(
          new maptilersdk.Popup().setHTML(
            `<span>
        ${data?.city.name}-${data?.city.country}
      </span>
      <span class="degree">
        ${convertKelvinToCelsius(firstData?.main.temp ?? 0)}°c
      </span>
      <a href="http://maps.google.com/maps?q=&layer=c&cbll=${position.lat},${
              position.lng
            }&cbp=11,0,0,0,0" target="blank"> <b>View Location</b></a>
      `
          )
        )
        .addTo(map.current);

      // marker from click map ----------------

      map.current.on("dblclick", function (e) {
        if (markerLocationClick.current) markerLocationClick.current.remove();

        let lat = e.lngLat.lat;
        let lon = e.lngLat.lng;
        markerLocationClick.current = new maptilersdk.Marker({
          color: "#2813e4d1",
        })
          .setLngLat([lon, lat])
          .setPopup(
            new maptilersdk.Popup().setHTML(
              `<span>
          <a href="http://maps.google.com/maps?q=&layer=c&cbll=${lat},${lon}&cbp=11,0,0,0,0" target="blank"> <b>View Location</b></a>
          </span>
          `
            )
          )
          .addTo(map.current);

        console.log("A click event has occurred at " + e.lngLat);
      });
    }, [data, position.lng, position.lat, zoom]);
  } catch (error) {
    console.error("NÃO FOI POSSÍVEL RENDERIZAR O MAPA!", error);
  }
  return (
    <div className="map-wrap w-full md:w-[40%]">
      <div
        ref={mapContainer}
        className="map h-[30vh] md:h-full rounded-[2rem]"
      />
    </div>
  );
}
