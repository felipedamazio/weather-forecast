import { SunAnimated } from "@/components/InitialPage/SunAnimated";
import { Orbitron } from "next/font/google";
import { FaLinkedin, FaGithubSquare, FaReact } from "react-icons/fa";
import { SiNextdotjs, SiTailwindcss } from "react-icons/si";
import { RiJavascriptFill } from "react-icons/ri";
import { BiLogoTypescript } from "react-icons/bi";
import Image from "next/image";
import FelpAvatar from "@/assets/img/FelpAvatar.png";
import vercel from "@/assets/img/vercel.png";
import maptiler from "@/assets/img/maptiler.png";
import openWeather from "@/assets/img/openWeather.png";
import leaflet from "@/assets/img/leaflet.png";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const myOrbitronFont = Orbitron({
  weight: "400",
  subsets: ["latin"],
});

export function InitialPage() {
  return (
    <Sheet>
      <section className="flex flex-col items-center gap-4">
        <span>
          <SunAnimated />
        </span>
        <span className="text-[2em]">Weather Forecasts</span>
        <SheetTrigger asChild>
          <Button variant="outline">About Project</Button>
        </SheetTrigger>
        <button className="animate-bounce text-2xl bg-[#5b5f97] text-blue-50 mt-10 p-3 rounded-3xl">
          <a href="/weather">Get Started</a>
        </button>
      </section>
      <section className="flex flex-col items-center justify-center pb-4">
        <a
          href="https://www.linkedin.com/in/felipe-damazio/"
          target="_blank"
          className={myOrbitronFont.className}
        >
          Developed by Felp
        </a>
        <p className={myOrbitronFont.className}>
          <span className="text-sm">All rights reserved ®</span>
        </p>
      </section>
      {/* Modal about Project */}
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Weather Forecasts</SheetTitle>
          <SheetDescription>
            Project developed by Felipe Damazio... A web application for
            real-time weather forecast searches and global map integration. It
            is possible to consult information such as degrees in the region
            sought and various additional detailed information
          </SheetDescription>
        </SheetHeader>
        <main>
          <section className="flex flex-col items-center gap-2 pt-6">
            <p className="text-[1.5rem]">Technologies</p>
            <div className="techs flex gap-1">
              <SiNextdotjs className="w-8 h-8 text-[#0a0a0a]" />
              <FaReact className="w-8 h-8 text-[#1ab6f9]" />
              <BiLogoTypescript className="w-8 h-8 text-[#268ad6]" />
              <RiJavascriptFill className="w-8 h-8 text-[#f0c733]" />
              <SiTailwindcss className="w-8 h-8 text-[#33daf0]" />
            </div>
          </section>
          <section className="flex flex-col items-center gap-2 pt-6">
            <p className="text-[1.5rem]">API's / Lib's</p>
            <div className="techs flex flex-col justify-center items-center gap-1">
              <Image
                src={openWeather}
                alt="openWeather logo"
                className="w-[40%]"
              />
              <Image src={maptiler} alt="maptiler logo" className="w-[40%]" />
              <Image src={leaflet} alt="leaflet logo" className="w-[40%]" />
              <span className="flex items-center justify-center">
                <p className={myOrbitronFont.className}>Deploy by </p>
                <Image src={vercel} alt="Vercel logo" className="w-[40%]" />
              </span>
            </div>
          </section>
        </main>
        <footer className="flex flex-col gap-4 w-full pt-4">
          <Image alt="FelpAvatar" src={FelpAvatar} />

          <div className="w-full flex  items-center justify-center ">
            <a
              href="https://www.linkedin.com/in/felipe-damazio/"
              target="_blank"
            >
              <FaLinkedin className="w-12 h-12" />
            </a>
            <a href="https://github.com/felipedamazio" target="_blank">
              <FaGithubSquare className="w-12 h-12" />
            </a>
          </div>
          <div className="w-full flex flex-col items-center justify-center">
            <a
              href="https://www.linkedin.com/in/felipe-damazio/"
              target="_blank"
              className={myOrbitronFont.className}
            >
              Developed by Felp
            </a>
            <p className={myOrbitronFont.className}>
              <span className="text-sm">All rights reserved ®</span>
            </p>
          </div>
        </footer>
      </SheetContent>
    </Sheet>
  );
}
