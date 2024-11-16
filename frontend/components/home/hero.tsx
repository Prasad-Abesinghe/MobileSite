import React from "react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <div className="flex w-screen flex-col items-center mt-6 lg:mt-20 z-50">
      <h1 className="text-4xl text-white sm:text-6xl font-bold lg:text-7xl text-center tracking-wide">
        Buy a Good Mobile Phones
        <span className=" bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text">
          {" "}
          For the Best Prices
        </span>
      </h1>
      <p className=" mt-10 text-lg text-center text-neutral-500 max-w-4xl">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae
        tempore hic placeat cupiditate nulla, corrupti facilis dicta dolore,
        sapiente commodi ullam atque amet blanditiis libero dolorum, perferendis
        aut voluptates repellat.
      </p>
      <div className="flex justify-center gap-4 my-10">
        <Button variant="outline">Shop Nov</Button>
        <Button variant="destructive" className=" bg-orange-800">
          Documentaion
        </Button>
      </div>{" "}
      <div className=" flex mt-10 justify-center">
        <video
          src="/homeAssets/video1.mp4"
          autoPlay
          loop
          muted
          className=" rounded-lg w-1/2 border border-orange-700 shadow-orange-400 mx-2 my-4"
        >
          Your browser does not support the video tag.
        </video>
        <video
          src="/homeAssets/video2.mp4"
          autoPlay
          loop
          muted
          className=" rounded-lg w-1/2 border border-orange-700 shadow-orange-400 mx-2 my-4"
        >
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default Hero;
