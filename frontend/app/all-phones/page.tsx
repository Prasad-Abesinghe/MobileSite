import PhoneCard from "@/components/PhoneCard";
import React from "react";

const page = () => {
  return (
    <div className="px-20 h-screen mx-auto relative">
      <div className=" grid grid-cols-4 gap-5 pt-10  xls:grid-cols-2 2xls:grid-cols-3">
        <PhoneCard />
      </div>
    </div>
  );
};

export default page;
