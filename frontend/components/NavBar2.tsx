import React from "react";
import { FaCartShopping, FaMobile } from "react-icons/fa6";
import { Button } from "./ui/button";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
  } from "@/components/ui/navigation-menu";

const NavBar2 = () => {
  return (
    <div className=" px-20 fixed w-screen  bg-slate-950 flex py-5 justify-between items-center border-b-2">
      <div>
        <h2 className=" text-white text-4xl flex font-bold "><FaMobile/> <span className=" text-orange-700">M</span>obiles</h2>
      </div>
      <div className="hidden md:flex">
        <input
          type="search"
          name="search"
          id="search"
          placeholder="search a phone"
          className=" py-2 px-20 text-black  rounded-l-lg border-black"
        />
        
        <Button variant="destructive">Search</Button>
      </div>
      <div>
        <div className=" flex justify-between items-center gap-2">
          <FaCartShopping className=" text-2xl text-white" />
          <div className=" text-white flex flex-col justify-center items-center">
            <div>Your Cart</div>
            <div>10$</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar2;
