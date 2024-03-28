import React, { useRef, useEffect, useState } from "react";
// import pinMarker from "../assets/img/pin-verde.png";
import * as maptilersdk from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";

const API_MAP_KEY = process.env.NEXT_PUBLIC_API_MAPTILER_KEY;

export function Map() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const tokyo = { lng: 139.753, lat: 35.6844 };
  const [zoom] = useState(14);
  maptilersdk.config.apiKey = API_MAP_KEY;

  useEffect(() => {
    if (map.current) return; // stops map from intializing more than once

    map.current = new maptilersdk.Map({
      container: mapContainer.current,
      style: maptilersdk.MapStyle.STREETS,
      center: [tokyo.lng, tokyo.lat],
      zoom: zoom,
    });

    new maptilersdk.Marker({ color: "#FF0000" })
      .setLngLat([139.7525, 35.6846])
      .addTo(map.current);
  }, [tokyo.lng, tokyo.lat, zoom]);

  return (
    <div className="map-wrap w-[80%]">
      <div ref={mapContainer} className="map h-[30vh]" />
    </div>
  );
}

// export const markerResult = (result: string) => {
//   let latitude = result.coord.lat;
//   let longitude = result.coord.lon;

//   let position = [latitude, longitude];

//   let iconVerde = new L.Icon({
//     iconUrl: pinMarker,
//     iconSize: [40, 45],
//     shadowSize: [50, 64],
//     iconAnchor: [20, 40],
//     popupAnchor: [0, -40],
//   });

//   if (marker) myMap.removeLayer(marker);

//   marker = L.marker(position, { icon: iconVerde }).addTo(myMap);
//   marker.bindPopup(`${result.name},${result.sys.country}`).openPopup();
// };
