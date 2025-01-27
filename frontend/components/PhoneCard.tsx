import React from "react";
import Image from "next/image";
import { Button } from "./ui/button";

interface PhoneCard {
  Title: "Galaxy S22 Ultra";
  Description: any;
  Price: "564$";
  MainImage: string;
  Brand: "Samsung";
  onClick: any;
}

const PhoneCard = ({
  Title,
  Description,
  Price,
  MainImage,
  Brand,
  onClick,
}: PhoneCard) => {
  return (
    <div
      onClick={onClick}
      className="border-silver-1 border text-black w-[350px] rounded-lg flex-col cursor-pointer hover:scale-105 transition relative"
    >
      <div
        className={`flex-1 w-full h-[150px] bg-slate-500 rounded-t-lg bg-contain bg-center ${MainImage}`}
      >
        {/* <div className="">
          <Image
            src={MainImage}
            layout="fill"
            className="object-cover"
            alt="product photo"
          />
        </div> */}
      </div>
      <div className="flex-1 p-2 flex flex-col ">
        <div className="flex items-center gap-2 mb-1">
          <p className="font-semibold">Galaxy S22 Ultra</p>
        </div>
        <div className="text-sm mb-3">
          The Samsung Galaxy S22 Ultra offers a 6.8-inch AMOLED display, 108MP
          camera, S Pen, powerful performance, and sleek, durable design.
        </div>
        <div className="flex justify-between items-center">
          <div>
            <p className="font-base">Samsung</p>
            <p className="font-semibold">Rs. 546$ /=</p>
          </div>
          <Button>See More</Button>
        </div>
      </div>
    </div>
  );
};

export default PhoneCard;
