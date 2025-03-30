"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Icons } from "@/components/icons";
import PhoneCard from "@/components/PhoneCard";
import { useSearchParams } from "next/navigation";

interface Phone {
  id: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  specs: {
    screen: string;
    processor: string;
    ram: string;
    storage: string;
    battery: string;
    camera: string;
  };
}

const phones: Phone[] = [
  {
    id: "1",
    name: "iPhone 15 Pro",
    brand: "Apple",
    price: 199999,
    image: "/phones/iphone-15-pro.png",
    specs: {
      screen: "6.7-inch Super Retina XDR",
      processor: "A17 Pro",
      ram: "8GB",
      storage: "256GB",
      battery: "3200mAh",
      camera: "48MP + 12MP + 12MP + 12MP",
    },
  },
  {
    id: "2",
    name: "Samsung Galaxy S24 Ultra",
    brand: "Samsung",
    price: 249999,
    image: "/phones/samsung-s24-ultra.png",
    specs: {
      screen: "6.8-inch Dynamic AMOLED 2X",
      processor: "Snapdragon 8 Gen 3",
      ram: "12GB",
      storage: "512GB",
      battery: "5000mAh",
      camera: "200MP + 12MP + 50MP + 10MP",
    },
  },
  {
    id: "3",
    name: "Google Pixel 8 Pro",
    brand: "Google",
    price: 179999,
    image: "/phones/google-pixel-8-pro.png",
    specs: {
      screen: "6.7-inch LTPO OLED",
      processor: "Google Tensor G3",
      ram: "12GB",
      storage: "256GB",
      battery: "5050mAh",
      camera: "50MP + 48MP + 48MP",
    },
  },
  {
    id: "4",
    name: "OnePlus 12",
    brand: "OnePlus",
    price: 159999,
    image: "/phones/oneplus-12.png",
    specs: {
      screen: "6.82-inch LTPO AMOLED",
      processor: "Snapdragon 8 Gen 3",
      ram: "16GB",
      storage: "512GB",
      battery: "5400mAh",
      camera: "50MP + 48MP + 64MP",
    },
  },
  {
    id: "5",
    name: "Xiaomi 14 Pro",
    brand: "Xiaomi",
    price: 149999,
    image: "/phones/xiaomi-14-pro.png",
    specs: {
      screen: "6.73-inch LTPO AMOLED",
      processor: "Snapdragon 8 Gen 3",
      ram: "12GB",
      storage: "256GB",
      battery: "4880mAh",
      camera: "50MP + 50MP + 50MP + 50MP",
    },
  },
  {
    id: "6",
    name: "OPPO Find X7 Ultra",
    brand: "OPPO",
    price: 189999,
    image: "/phones/oppo-find-x7-ultra.png",
    specs: {
      screen: "6.82-inch LTPO AMOLED",
      processor: "Snapdragon 8 Gen 3",
      ram: "16GB",
      storage: "512GB",
      battery: "5000mAh",
      camera: "50MP + 50MP + 50MP + 50MP",
    },
  },
  {
    id: "7",
    name: "Vivo X100 Pro",
    brand: "Vivo",
    price: 169999,
    image: "/phones/vivo-x100-pro.png",
    specs: {
      screen: "6.78-inch LTPO AMOLED",
      processor: "Dimensity 9300",
      ram: "12GB",
      storage: "256GB",
      battery: "5400mAh",
      camera: "50MP + 50MP + 50MP + 50MP",
    },
  },
  {
    id: "8",
    name: "Realme GT 5 Pro",
    brand: "Realme",
    price: 139999,
    image: "/phones/realme-gt-5-pro.png",
    specs: {
      screen: "6.78-inch LTPO AMOLED",
      processor: "Snapdragon 8 Gen 3",
      ram: "12GB",
      storage: "256GB",
      battery: "5400mAh",
      camera: "50MP + 8MP + 32MP + 2MP",
    },
  },
];

export default function AllPhonesPage() {
  const searchParams = useSearchParams();
  const [sortBy, setSortBy] = useState<
    "price-asc" | "price-desc" | "name-asc" | "name-desc"
  >("price-asc");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);

  useEffect(() => {
    const brand = searchParams.get("brand");
    if (brand) {
      setSelectedBrand(brand);
    }
  }, [searchParams]);

  const sortPhones = (phones: Phone[]) => {
    return [...phones].sort((a, b) => {
      switch (sortBy) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "name-asc":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });
  };

  const filterPhones = (phones: Phone[]) => {
    let filtered = phones;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (phone) =>
          phone.name.toLowerCase().includes(query) ||
          phone.brand.toLowerCase().includes(query) ||
          phone.specs.processor.toLowerCase().includes(query) ||
          phone.specs.ram.toLowerCase().includes(query) ||
          phone.specs.storage.toLowerCase().includes(query)
      );
    }

    if (selectedBrand) {
      filtered = filtered.filter(
        (phone) => phone.brand.toLowerCase() === selectedBrand.toLowerCase()
      );
    }

    return filtered;
  };

  const filteredAndSortedPhones = sortPhones(filterPhones(phones));

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col space-y-4 mb-12"
      >
        <h1 className="text-4xl font-bold">
          {selectedBrand ? `${selectedBrand} Phones` : "All Phones"}
        </h1>
        <p className="text-lg text-muted-foreground">
          {selectedBrand
            ? `Browse our collection of ${selectedBrand} smartphones`
            : "Browse our complete collection of smartphones"}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex flex-col sm:flex-row gap-4 mb-8"
      >
        <div className="flex-1">
          <div className="relative">
            <Icons.search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search phones by name, brand, or specs..."
              className="pl-9 h-12"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="w-full sm:w-[200px]">
          <Select
            value={sortBy}
            onValueChange={(value: any) => setSortBy(value)}
          >
            <SelectTrigger className="h-12">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
              <SelectItem value="name-asc">Name: A to Z</SelectItem>
              <SelectItem value="name-desc">Name: Z to A</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
      >
        {filteredAndSortedPhones.map((phone) => (
          <PhoneCard key={phone.id} phone={phone} />
        ))}
      </motion.div>

      {filteredAndSortedPhones.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="text-lg text-muted-foreground">
            No phones found matching your search criteria.
          </p>
        </motion.div>
      )}
    </div>
  );
}
