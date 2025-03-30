"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";

const brands = [
  {
    id: "apple",
    name: "Apple",
    logo: "/brands/apple.png",
    description: "Premium smartphones with cutting-edge technology",
    phoneCount: 4,
    flagship: "iPhone 15 Pro",
  },
  {
    id: "samsung",
    name: "Samsung",
    logo: "/brands/samsung.png",
    description: "Innovative Android devices with powerful features",
    phoneCount: 6,
    flagship: "Galaxy S24 Ultra",
  },
  {
    id: "google",
    name: "Google",
    logo: "/brands/google.png",
    description: "Pure Android experience with advanced AI",
    phoneCount: 2,
    flagship: "Pixel 8 Pro",
  },
  {
    id: "oneplus",
    name: "OnePlus",
    logo: "/brands/oneplus.png",
    description: "Fast and smooth performance at great value",
    phoneCount: 3,
    flagship: "OnePlus 12",
  },
  {
    id: "xiaomi",
    name: "Xiaomi",
    logo: "/brands/xiaomi.png",
    description: "Feature-rich phones at competitive prices",
    phoneCount: 5,
    flagship: "Xiaomi 14 Pro",
  },
  {
    id: "oppo",
    name: "OPPO",
    logo: "/brands/oppo.png",
    description: "Innovative camera technology and design",
    phoneCount: 4,
    flagship: "Find X7 Ultra",
  },
  {
    id: "vivo",
    name: "Vivo",
    logo: "/brands/vivo.png",
    description: "Professional photography experience",
    phoneCount: 3,
    flagship: "X100 Pro",
  },
  {
    id: "realme",
    name: "Realme",
    logo: "/brands/realme.png",
    description: "Youth-focused smartphones with great features",
    phoneCount: 4,
    flagship: "GT 5 Pro",
  },
];

export default function BrandsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col space-y-4 mb-12"
      >
        <h1 className="text-4xl font-bold">Mobile Brands</h1>
        <p className="text-lg text-muted-foreground">
          Explore our collection of premium smartphone brands
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
      >
        {brands.map((brand) => (
          <motion.div
            key={brand.id}
            whileHover={{ scale: 1.02 }}
            className="group relative overflow-hidden rounded-lg border bg-background p-6 hover:shadow-lg transition-shadow"
          >
            <div className="aspect-square relative mb-6">
              <Image
                src={brand.logo}
                alt={brand.name}
                fill
                className="object-contain transition-transform group-hover:scale-105"
              />
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold">{brand.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {brand.description}
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    Available Phones
                  </span>
                  <span className="font-medium">{brand.phoneCount}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Flagship Model</span>
                  <span className="font-medium">{brand.flagship}</span>
                </div>
              </div>
              <Button className="w-full" asChild>
                <Link href={`/all-phones?brand=${brand.id}`}>View Phones</Link>
              </Button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
