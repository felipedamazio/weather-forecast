import React from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { FaReact } from "react-icons/fa";
import { SiNextdotjs, SiTailwindcss } from "react-icons/si";
import { RiJavascriptFill } from "react-icons/ri";
import { BiLogoTypescript } from "react-icons/bi";
import Image from "next/image";
import { Orbitron } from "next/font/google";
import vercel from "@/assets/img/vercel.png";
import maptiler from "@/assets/img/maptiler.png";
import openWeather from "@/assets/img/openWeather.png";
import leaflet from "@/assets/img/leaflet.png";

const myOrbitronFont = Orbitron({
  weight: "400",
  subsets: ["latin"],
});

export function AccordionCustom() {
  const [open, setOpen] = React.useState(1);

  const handleOpen = (value: number) => setOpen(open === value ? 0 : value);

  return (
    <>
      <Accordion
        open={open === 1}
        className="mb-2 rounded-lg border border-blue-gray-100 px-4"
      >
        <AccordionHeader
          onClick={() => handleOpen(1)}
          className={`border-b-0 transition-colors ${
            open === 1 ? "text-blue-500 hover:!text-blue-700" : ""
          }`}
        >
          <p>About</p>
        </AccordionHeader>
        <AccordionBody className="pt-0 text-base font-normal">
          <span>
            Project developed by Felipe Damazio... A web application for
            real-time weather forecast searches and global map integration. It
            is possible to consult information such as degrees in the region
            sought and various additional detailed information
          </span>
        </AccordionBody>
      </Accordion>
      <Accordion
        open={open === 2}
        className="mb-2 rounded-lg border border-blue-gray-100 px-4"
      >
        <AccordionHeader
          onClick={() => handleOpen(2)}
          className={`border-b-0 transition-colors ${
            open === 2 ? "text-blue-500 hover:!text-blue-700" : ""
          }`}
        >
          <p>Technologies</p>
        </AccordionHeader>
        <AccordionBody className="pt-0 text-base font-normal">
          <div className="techs flex gap-1">
            <SiNextdotjs className="w-8 h-8 text-[#0a0a0a]" />
            <FaReact className="w-8 h-8 text-[#1ab6f9]" />
            <BiLogoTypescript className="w-8 h-8 text-[#268ad6]" />
            <RiJavascriptFill className="w-8 h-8 text-[#f0c733]" />
            <SiTailwindcss className="w-8 h-8 text-[#33daf0]" />
          </div>
        </AccordionBody>
      </Accordion>
      <Accordion
        open={open === 3}
        className="mb-2 rounded-lg border border-blue-gray-100 px-4"
      >
        <AccordionHeader
          onClick={() => handleOpen(3)}
          className={`border-b-0 transition-colors ${
            open === 3 ? "text-blue-500 hover:!text-blue-700" : ""
          }`}
        >
          <p>API's and Library's</p>
        </AccordionHeader>
        <AccordionBody className="pt-0 text-base font-normal">
          <section className="flex flex-col items-center gap-2">
            <div className="techs flex flex-col justify-center items-center gap-1">
              <Image
                src={openWeather}
                alt="openWeather logo"
                className="w-[40%]"
              />
              <Image src={maptiler} alt="maptiler logo" className="w-[40%]" />
              <Image src={leaflet} alt="leaflet logo" className="w-[40%]" />
            </div>
          </section>
        </AccordionBody>
      </Accordion>
      <span className="flex items-center justify-center">
        <p className={myOrbitronFont.className}>Deploy by </p>
        <Image src={vercel} alt="Vercel logo" className="w-[40%]" />
      </span>
    </>
  );
}
