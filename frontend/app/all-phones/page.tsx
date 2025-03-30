"use client";
import React, { useState } from "react";
import PhoneCard from "@/components/PhoneCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Phone {
  id: number;
  name: string;
  brand: string;
  price: number;
  image: string;
  specs: {
    ram: string;
    storage: string;
    battery: string;
  };
}

// Sample data - replace with your actual data
const phones: Phone[] = [
  {
    id: 1,
    name: "iPhone 15 Pro",
    brand: "Apple",
    price: 199999,
    image: "/phones/iphone15pro.jpg",
    specs: {
      ram: "8GB",
      storage: "256GB",
      battery: "3200mAh",
    },
  },
  {
    id: 2,
    name: "Samsung Galaxy S24 Ultra",
    brand: "Samsung",
    price: 249999,
    image: "/phones/s24ultra.jpg",
    specs: {
      ram: "12GB",
      storage: "512GB",
      battery: "5000mAh",
    },
  },
  // Add more phones here
];

type SortOption = "price_asc" | "price_desc" | "name_asc" | "name_desc";

export default function AllPhones() {
  const [sortBy, setSortBy] = useState<SortOption>("name_asc");

  const sortPhones = (phonesList: Phone[]) => {
    return [...phonesList].sort((a, b) => {
      switch (sortBy) {
        case "price_asc":
          return a.price - b.price;
        case "price_desc":
          return b.price - a.price;
        case "name_asc":
          return a.name.localeCompare(b.name);
        case "name_desc":
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });
  };

  const sortedPhones = sortPhones(phones);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          All Phones
        </h1>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Sort by:
          </span>
          <Select
            value={sortBy}
            onValueChange={(value: SortOption) => setSortBy(value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select sorting" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="price_asc">Price: Low to High</SelectItem>
              <SelectItem value="price_desc">Price: High to Low</SelectItem>
              <SelectItem value="name_asc">Name: A to Z</SelectItem>
              <SelectItem value="name_desc">Name: Z to A</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {sortedPhones.map((phone) => (
          <PhoneCard key={phone.id} phone={phone} />
        ))}
      </div>
    </div>
  );
}
