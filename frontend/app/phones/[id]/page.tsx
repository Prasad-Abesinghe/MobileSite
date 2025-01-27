import React from "react";
import { BiChevronLeft } from "react-icons/bi";
import { Button } from "@/components/ui/button";
import { Clock, Link, PackageCheck, Phone, RefreshCw } from "lucide-react";

const SinglePhone = () => {
  return (
    <section className=" md:pt-40 pt-35 pb-32 px-20">
      <div className=" container mx-auto">
        <div className=" flex flex-col xl:flex-row gap-14">
          <div className="xl:flex-1 h-[460px] xl:w-[700px] bg-slate-600 xl:h-[540px] flex justify-center items-center "></div>
          <div className=" flex-1 flex flex-col justify-center items-start gap-10">
            <Link
              to={"/"}
              className=" flex items-center gap-2 text-black font-semibold"
            >
              <BiChevronLeft size={20} />
              Back to Home
            </Link>
            <div className=" flex flex-col gap-6 items-start">
              <div>
                <h2 className="font-bold">Galaxy S22</h2>
                <h3 className=" ">Samsung</h3>
                <p className=" text-lg font-semibold">$543</p>
              </div>
              <p>
                The Samsung Galaxy S22 Ultra is a premium flagship smartphone
                featuring a 6.8-inch Dynamic AMOLED 2X display with a 120Hz
                refresh rate and QHD+ resolution. Powered by a high-performance
                processor (Exynos 2200 or Snapdragon 8 Gen 1, depending on the
                region), it offers up to 12GB of RAM and ample storage options.
                Its quad-camera setup includes a 108MP main sensor, 10x optical
                zoom, and advanced night photography capabilities. The S22 Ultra
                also comes with an integrated S Pen, a 5000mAh battery with fast
                charging, and a sleek, durable design with Gorilla Glass Victus+
                and IP68 water resistance.
              </p>
              <Button>Add to Cart</Button>
            </div>
            <div className=" flex flex-col text-black gap-3">
              <div className=" flex gap-2">
                <PackageCheck size={20} className=" " />
                <p>Free shipping on orders over $130</p>
              </div>
              <div className="flex gap-2">
                <RefreshCw size={20} className=" " />
                <p>Free return for 30 days</p>
              </div>
              <div className="flex gap-2">
                <Phone size={20} className=" " />
                <p>
                  The phones are partially assembled and benifit from transpotr
                  insuarance
                </p>
              </div>
              <div className="flex gap-2">
                <Clock size={20} className=" " />
                <p>Fast delivery</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SinglePhone;
