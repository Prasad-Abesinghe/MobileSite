"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { useCart } from "@/hooks/useCart";

interface ProductDto {
  _id: string;
  name: string;
  brand: string;
  price: number;
  images?: string[];
  description?: string;
  specifications?: Record<string, string>;
}

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<ProductDto | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const id = Array.isArray(params.id) ? params.id[0] : (params.id as string);
    if (!id) return;
    let mounted = true;
    (async () => {
      try {
        const { api } = await import("@/lib/api");
        const res = await api.getProductById(id);
        if (!mounted) return;
        setProduct(res?._id ? res : null);
      } finally {
        setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [params.id]);

  if (loading) {
    return (
      <section className="pt-28 pb-16 px-4">
        <div className="container mx-auto">
          <div className="h-64 rounded-xl bg-gray-100 dark:bg-gray-800 animate-pulse" />
        </div>
      </section>
    );
  }

  if (!product) {
    return (
      <section className="pt-28 pb-16 px-4">
        <div className="container mx-auto text-center text-gray-600 dark:text-gray-300">
          Product not found
        </div>
      </section>
    );
  }

  const primaryImage = product.images?.[0] || "/assets/placeholder.png";

  return (
    <section className="pt-28 pb-16 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col xl:flex-row gap-10">
          <div className="xl:flex-1 bg-white dark:bg-gray-900 rounded-xl border p-4 flex items-center justify-center min-h-[380px]">
            <div className="relative w-full max-w-[480px] aspect-[4/3]">
              <Image
                src={primaryImage}
                alt={product.name}
                fill
                className="object-contain rounded-lg"
              />
            </div>
          </div>

          <div className="flex-1 flex flex-col gap-6">
            <div>
              <h2 className="text-2xl font-bold">{product.name}</h2>
              <p className="text-gray-500 dark:text-gray-400">
                {product.brand}
              </p>
              <p className="mt-2 text-2xl font-semibold">
                Rs. {Number(product.price).toLocaleString()}
              </p>
            </div>

            {product.description && (
              <p className="text-gray-700 dark:text-gray-300">
                {product.description}
              </p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              {product.specifications &&
                Object.entries(product.specifications).map(([k, v]) => (
                  <div
                    key={k}
                    className="flex justify-between bg-gray-50 dark:bg-gray-800 rounded px-3 py-2"
                  >
                    <span className="text-gray-500 dark:text-gray-400">
                      {k}
                    </span>
                    <span className="font-medium">{v}</span>
                  </div>
                ))}
            </div>

            <div className="flex gap-3 pt-2">
              <Button
                onClick={() =>
                  addToCart({
                    id: product._id,
                    name: product.name,
                    brand: product.brand,
                    price: Number(product.price) || 0,
                    image: primaryImage,
                  })
                }
              >
                Add to Cart
              </Button>
              <Button variant="outline" onClick={() => router.back()}>
                Back
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
