/** @format */

import { cn } from "@/utils/cn";
import React from "react";

export function CreateContainer(props: React.HTMLProps<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={cn(
        "w-full bg-white border rounded-[25px] flex shadow-sm",
        props.className
      )}
    />
  );
}
