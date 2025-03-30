import React from "react";
import Image from "next/image";
import { Button } from "./ui/button";

interface PhoneSpecs {
  ram: string;
  storage: string;
  battery: string;
}

interface Phone {
  id: number;
  name: string;
  brand: string;
  price: number;
  image: string;
  specs: PhoneSpecs;
}

interface PhoneCardProps {
  phone: Phone;
}

export default function PhoneCard({ phone }: PhoneCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48 w-full">
        <Image
          src={phone.image}
          alt={phone.name}
          fill
          className="object-contain p-4"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {phone.name}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {phone.brand}
        </p>
        <div className="mt-2 space-y-1">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            RAM: {phone.specs.ram}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Storage: {phone.specs.storage}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Battery: {phone.specs.battery}
          </p>
        </div>
        <div className="mt-4 flex justify-between items-center">
          <p className="text-xl font-bold text-orange-600">
            Rs. {phone.price.toLocaleString()}
          </p>
          <Button className="bg-orange-600 hover:bg-orange-700 text-white">
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}
