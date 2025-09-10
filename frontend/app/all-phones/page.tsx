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

export default function AllPhonesPage() {
  const searchParams = useSearchParams();
  const [sortBy, setSortBy] = useState<
    "price-asc" | "price-desc" | "name-asc" | "name-desc"
  >("price-asc");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [phones, setPhones] = useState<Phone[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const brand = searchParams.get("brand");
    if (brand) {
      setSelectedBrand(brand);
    }
  }, [searchParams]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const { api } = await import("@/lib/api");
        const res = await api.getProducts();
        if (!mounted) return;
        const mapped: Phone[] = Array.isArray(res)
          ? res.map((p: any) => ({
              id: p._id,
              name: p.name,
              brand: p.brand,
              price: Number(p.price) || 0,
              image: p.images?.[0] || "/assets/placeholder.png",
              specs: {
                screen:
                  p.specifications?.Screen || p.specifications?.screen || "-",
                processor:
                  p.specifications?.Processor ||
                  p.specifications?.processor ||
                  "-",
                ram: p.specifications?.RAM || p.specifications?.ram || "-",
                storage:
                  p.specifications?.Storage || p.specifications?.storage || "-",
                battery:
                  p.specifications?.Battery || p.specifications?.battery || "-",
                camera:
                  p.specifications?.Camera || p.specifications?.camera || "-",
              },
            }))
          : [];
        setPhones(mapped);
      } finally {
        setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const sortPhones = (list: Phone[]) => {
    return [...list].sort((a, b) => {
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

  const filterPhones = (list: Phone[]) => {
    let filtered = list;

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
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/4 space-y-6">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Filters</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="search">Search</Label>
                <Input
                  id="search"
                  placeholder="Search phones"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div>
                <Label>Brand</Label>
                <Select
                  value={selectedBrand || "all"}
                  onValueChange={(value) =>
                    setSelectedBrand(value === "all" ? null : value)
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select brand" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Brands</SelectItem>
                    <SelectItem value="Apple">Apple</SelectItem>
                    <SelectItem value="Samsung">Samsung</SelectItem>
                    <SelectItem value="Google">Google</SelectItem>
                    <SelectItem value="OnePlus">OnePlus</SelectItem>
                    <SelectItem value="Xiaomi">Xiaomi</SelectItem>
                    <SelectItem value="OPPO">OPPO</SelectItem>
                    <SelectItem value="Vivo">Vivo</SelectItem>
                    <SelectItem value="Realme">Realme</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Sort by</Label>
                <Select value={sortBy} onValueChange={(v: any) => setSortBy(v)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="price-asc">
                      Price: Low to High
                    </SelectItem>
                    <SelectItem value="price-desc">
                      Price: High to Low
                    </SelectItem>
                    <SelectItem value="name-asc">Name: A to Z</SelectItem>
                    <SelectItem value="name-desc">Name: Z to A</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:w-3/4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading
              ? Array.from({ length: 9 }).map((_, idx) => (
                  <div
                    key={idx}
                    className="h-72 rounded-xl bg-gray-100 dark:bg-gray-800 animate-pulse"
                  />
                ))
              : filteredAndSortedPhones.map((phone) => (
                  <motion.div
                    key={phone.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <PhoneCard phone={phone} />
                  </motion.div>
                ))}
          </div>
        </div>
      </div>
    </div>
  );
}
