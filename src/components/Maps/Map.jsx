import React, { useRef, useEffect, useState } from "react";
import * as maptilersdk from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";
import { convertKelvinToCelsius } from "@/utils/convertKelvinToCelsius";
import { Marker } from "@/components/Maps/Marker";

export function Map({ data }) {
  const API_MAP_KEY = process.env.NEXT_PUBLIC_API_MAPTILER_KEY;

  const mapContainer = useRef(null);
  const map = useRef(null);
  const position = { lng: data?.city.coord.lon, lat: data?.city.coord.lat };
  const [zoom] = useState(11);
  const firstData = data?.list[1];

  maptilersdk.config.apiKey = API_MAP_KEY;

  useEffect(() => {
    if (!map.current) {
      map.current = new maptilersdk.Map({
        container: mapContainer.current,
        style: maptilersdk.MapStyle.STREETS,
        center: [position.lng, position.lat],
        zoom: zoom,
      });
    }

    // Remove all previous markers
    // map.current.removeAllMarkers();

    // Add a new marker
    Marker(data, map.current);
  }, [data, position.lng, position.lat, zoom]);

  return (
    <div className="map-wrap w-full md:w-[40%]">
      <div ref={mapContainer} className="map h-[30vh] md:h-full rounded-lg" />
    </div>
  );
}
