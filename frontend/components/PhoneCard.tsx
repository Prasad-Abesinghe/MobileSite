"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";

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

interface PhoneCardProps {
  phone: Phone;
}

export default function PhoneCard({ phone }: PhoneCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-lg border bg-background p-2 hover:shadow-lg transition-shadow">
      <div className="aspect-square overflow-hidden rounded-lg">
        <Image
          src={phone.image}
          alt={phone.name}
          width={500}
          height={500}
          className="object-contain transition-transform group-hover:scale-105"
        />
      </div>
      <div className="mt-4 space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">{phone.name}</h3>
          <span className="text-sm text-muted-foreground">{phone.brand}</span>
        </div>
        <p className="text-2xl font-bold">Rs. {phone.price.toLocaleString()}</p>
        <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Icons.screen className="h-4 w-4" />
            <span>{phone.specs.screen}</span>
          </div>
          <div className="flex items-center gap-1">
            <Icons.processor className="h-4 w-4" />
            <span>{phone.specs.processor}</span>
          </div>
          <div className="flex items-center gap-1">
            <Icons.ram className="h-4 w-4" />
            <span>{phone.specs.ram}</span>
          </div>
          <div className="flex items-center gap-1">
            <Icons.storage className="h-4 w-4" />
            <span>{phone.specs.storage}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button className="flex-1" asChild>
            <Link href={`/phones/${phone.id}`}>View Details</Link>
          </Button>
          <Button variant="outline" size="icon">
            <Icons.heart className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
