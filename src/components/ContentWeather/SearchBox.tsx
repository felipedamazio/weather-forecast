import axios from "axios";

import { URL_API } from "@/API/UrlApi";
import React, { KeyboardEvent } from "react";
import { IoSearch } from "react-icons/io5";
import { CardClimateData } from "@/components/ContentWeather/CardClimateComp";

type Props = {
  className?: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
  onSubmit: React.FormEventHandler<HTMLFormElement> | undefined;
};

export function SearchBox(props: Props) {
  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === "Enter") getResult(props.value);
  };

  return (
    <form
      onSubmit={props.onSubmit}
      className="flex relative items-center justify-center h-10"
    >
      {props.className}
      <input
        type="text"
        value={props.value}
        onChange={props.onChange}
        placeholder="Search location.."
        className="px-4 py-2 w-[230px] border border-gray-300 rounded-l-md focus:outline-none  focus:border-blue-500 h-full"
        onKeyDown={handleKeyPress}
      />
      <button
        type="submit"
        className="px-4 py-[9px] bg-blue-500 text-white rounded-r-md focus:outline-none hover:bg-blue-600  h-full"
      >
        <IoSearch />
      </button>
    </form>
  );
}

const getResult = (cityName: string) => {
  const API_KEY = process.env.NEXT_PUBLIC_WEATHER_KEY;
  const baseURL = `${URL_API}weather?q=${cityName}&appid=${API_KEY}&units=metric&lang=pt`;

  const [post, setPost] = React.useState(null);

  React.useEffect(() => {
    axios.get(baseURL).then((response) => {
      setPost(response.data);
    });
  }, []);

  if (!post) return "No post!";

  return <CardClimateData />;
};
