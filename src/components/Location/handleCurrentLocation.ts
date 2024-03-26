// import axios from "axios";
// import { useAtom } from "jotai";
// import { loadingCityAtom, placeAtom } from "@/app/atom";

// export function handleCurrentLocation() {
//   const [place, setPlace] = useAtom(placeAtom);
//   const [_, setLoadingCity] = useAtom(loadingCityAtom);

//   // const API_KEY = process.env.NEXT_PUBLIC_WEATHER_KEY;
//   const API_KEY = "cb6525c44bf35826a0223f93eedf14c2";

//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(async (postiion) => {
//       const { latitude, longitude } = postiion.coords;
//       try {
//         setLoadingCity(true);
//         const response = await axios.get(
//           `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
//         );
//         setTimeout(() => {
//           setLoadingCity(false);
//           setPlace(response.data.name);          
//         }, 500);
//       } catch (error) {
//         setLoadingCity(false);
//       }
//     });
//   }
// }
