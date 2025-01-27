import NavBar from "@/components/NavBar";
import NavBar2 from "@/components/NavBar2";
import { BackgroundCellAnimation } from "@/components/ui/BackgroundRippleEffect";
import React from "react";

export default function Home() {
  return (
    <div>
      <div className=" fixed z-50 mb-5">
        <NavBar />
        <NavBar2 />
      </div>
      <div className=" mx-auto w-full h-full  ">
        <BackgroundCellAnimation />
      </div>
    </div>
  );
}
