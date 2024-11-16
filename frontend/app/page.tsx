import FavMobiles from "@/components/home/FavMobiles";
import Hero from "@/components/home/Hero";
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
      <BackgroundCellAnimation />
    </div>
  );
}
