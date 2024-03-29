import React, { useRef, useEffect, useState } from "react";
// import pinMarker from "../assets/img/pin-verde.png";
import * as maptilersdk from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";
import { Marker } from "@/components/Maps/Marker";
import { WeatherData } from "@/types/WeatherData";

export function Map({data}) {
  const API_MAP_KEY = process.env.NEXT_PUBLIC_API_MAPTILER_KEY;

  const mapContainer = useRef(null);
  const map = useRef(null);
  const position = { lng: data?.city.coord.lon, lat: data?.city.coord.lat };
  const [zoom] = useState(11);

  maptilersdk.config.apiKey = API_MAP_KEY;

  useEffect(() => {
    if (map.current) return; // stops map from intializing more than once

    map.current = new maptilersdk.Map({
      container: mapContainer.current,
      style: maptilersdk.MapStyle.STREETS,
      center: [position.lng, position.lat],
      zoom: zoom,
    });

    Marker(data, map.current);
  }, [position.lng, position.lat, zoom]);

  return (
    <div className="map-wrap w-[100%]">
      <div ref={mapContainer} className="map h-[30vh] rounded-lg" />
    </div>
  );
}
