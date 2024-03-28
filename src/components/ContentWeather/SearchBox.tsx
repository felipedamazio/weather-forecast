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
        className="px-4 py-2 w-[75%] border border-gray-300 rounded-l-md focus:outline-none  focus:border-blue-500 h-full"        
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
