"use client";

import { SunAnimated } from "@/components/InitialPage/SunAnimated";
import { AccordionCustom } from "@/components/InitialPage/Accordion";
import { Orbitron } from "next/font/google";
import { FaLinkedin, FaGithubSquare } from "react-icons/fa";
import Image from "next/image";
import FelpAvatar from "@/assets/img/FelpAvatar.png";

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
        </SheetHeader>
        <main>
          <section className="accordion pt-4"></section>
          <AccordionCustom />
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
            <span className={myOrbitronFont.className}>Developed by Felp</span>
            <p className={myOrbitronFont.className}>
              <span className="text-sm">All rights reserved ®</span>
            </p>
          </div>
        </footer>
      </SheetContent>
    </Sheet>
  );
}
