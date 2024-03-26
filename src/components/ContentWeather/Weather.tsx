// import React, { FormEvent, useEffect, useState } from "react";
// import { URL_API } from "@/API/UrlApi";
// import { loadingCityAtom, placeAtom } from "@/app/atom";
// import { useAtom } from "jotai";
// import { useQuery } from "react-query";
// import axios from "axios";
// // Comps -----------------
// import { WeatherData } from "@/types/WeatherData";

// const Weather = () => {
//    // const API_KEY = process.env.NEXT_PUBLIC_WEATHER_KEY;
//    const API_KEY = "cb6525c44bf35826a0223f93eedf14c2";

//   const [place, setPlace] = useAtom(placeAtom);
//   const [loadingCity] = useAtom(loadingCityAtom);

//   const { isLoading, error, data, refetch } = useQuery<WeatherData>(
//     "repoData",
//     async () => {
//       const { data } = await axios.get(
//         `${URL_API}forecast?q=pane&appid=${API_KEY}&cnt=56`
//       );
//       return data;
//     }
//   );

//   useEffect(() => {
//     refetch();
//   }, [place, refetch]);

//   const firstData = data?.list[0];

//   return (
//     <div>
//       <>
//         <h2>{data?.city.name}</h2>
//         <p>Temperature: {firstData?.main.temp}°C</p>
//         {/* <p>Description: {weatherData.weather[0].description}</p>
//         <p>Feels like : {weatherData.main.feels_like}°C</p>
//         <p>Humidity : {weatherData.main.humidity}%</p>
//         <p>Pressure : {weatherData.main.pressure}</p>
//         <p>Wind Speed : {weatherData.wind.speed}m/s</p> */}
//       </>
//     </div>
//   );
// };

// export default Weather;
