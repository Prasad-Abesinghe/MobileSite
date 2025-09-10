"use client";
import React, { useEffect, useMemo, useState } from "react";
import {
  Plus,
  Search,
  Filter,
  Edit,
  Trash,
  Package,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth, useIsAdmin } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

interface AdminProduct {
  _id: string;
  name: string;
  brand: string;
  price: number;
  stock: number;
  status: string;
  category: string;
  images?: string[];
}

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const { token } = useAuth();
  const isAdmin = useIsAdmin();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<AdminProduct[]>([]);

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form fields
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [category, setCategory] = useState("Smartphones");
  const [stock, setStock] = useState<number | "">(0);
  const [images, setImages] = useState(""); // comma-separated URLs
  const [specsText, setSpecsText] = useState(""); // key=value per line

  useEffect(() => {
    if (!isAdmin) {
      router.replace("/");
      return;
    }
    let mounted = true;
    (async () => {
      try {
        const { api } = await import("@/lib/api");
        const res = await api.getProducts();
        if (!mounted) return;
        setProducts(Array.isArray(res) ? res : []);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [isAdmin, router]);

  const filteredProducts = useMemo(() => {
    let list = products;
    if (categoryFilter !== "all") {
      // backend uses capitalized categories
      const map: Record<string, string> = {
        smartphones: "Smartphones",
        tablets: "Tablets",
        accessories: "Accessories",
      };
      const target = map[categoryFilter] ?? categoryFilter;
      list = list.filter((p) => p.category === target);
    }
    if (statusFilter !== "all") {
      const map: Record<string, string> = {
        in_stock: "In Stock",
        low_stock: "Low Stock",
        out_of_stock: "Out of Stock",
      };
      const target = map[statusFilter] ?? statusFilter;
      list = list.filter((p) => p.status === target);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }
    return list;
  }, [products, categoryFilter, statusFilter, searchQuery]);

  const resetForm = () => {
    setName("");
    setBrand("");
    setDescription("");
    setPrice("");
    setCategory("Smartphones");
    setStock(0);
    setImages("");
    setSpecsText("");
    setError(null);
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!name.trim() || !brand.trim() || !description.trim()) {
      setError("Please fill required fields");
      return;
    }
    if (price === "" || Number(price) <= 0) {
      setError("Please provide a valid price");
      return;
    }
    if (stock === "" || Number.isNaN(Number(stock))) {
      setError("Please provide valid stock");
      return;
    }
    const imageArr = images
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    if (imageArr.length === 0) {
      setError("Please add at least one image URL");
      return;
    }
    const specifications: Record<string, string> = {};
    specsText
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean)
      .forEach((line) => {
        const idx = line.indexOf("=");
        if (idx > 0) {
          const k = line.slice(0, idx).trim();
          const v = line.slice(idx + 1).trim();
          if (k) specifications[k] = v;
        }
      });
    if (Object.keys(specifications).length === 0) {
      setError("Please add at least one specification as key=value");
      return;
    }

    setCreating(true);
    try {
      const { api } = await import("@/lib/api");
      const res = await api.createProduct(token as string, {
        name: name.trim(),
        brand: brand.trim(),
        description: description.trim(),
        price: Number(price),
        category,
        stock: Number(stock),
        images: imageArr,
        specifications,
      });
      if (res && res._id) {
        setProducts((prev) => [res, ...prev]);
        setIsAddOpen(false);
        resetForm();
      } else {
        setError(res?.message || "Failed to create product");
      }
    } catch (e) {
      setError("Network error. Please try again.");
    } finally {
      setCreating(false);
    }
  };

  if (!isAdmin) return null;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Products
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Manage your product inventory
          </p>
        </div>
        <Button
          className="bg-orange-600 hover:bg-orange-700 text-white"
          onClick={() => setIsAddOpen(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Product
        </Button>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:text-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-4">
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="smartphones">Smartphones</SelectItem>
                <SelectItem value="tablets">Tablets</SelectItem>
                <SelectItem value="accessories">Accessories</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="in_stock">In Stock</SelectItem>
                <SelectItem value="low_stock">Low Stock</SelectItem>
                <SelectItem value="out_of_stock">Out of Stock</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b dark:border-gray-700">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {(loading
                ? Array.from({ length: 6 })
                : (filteredProducts as any[]).filter(Boolean)
              ).map((product: any, idx) => {
                const p = product || {};
                return (
                  <tr
                    key={p?._id ?? idx}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          {loading ? (
                            <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700" />
                          ) : (
                            <img
                              className="h-10 w-10 rounded-full object-cover"
                              src={p?.images?.[0] || "/assets/placeholder.png"}
                              alt={p?.name || "Product"}
                            />
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {loading ? (
                              <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded" />
                            ) : (
                              p.name || "-"
                            )}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {loading ? (
                              <div className="h-3 w-20 bg-gray-200 dark:bg-gray-700 rounded mt-1" />
                            ) : (
                              p.brand || "-"
                            )}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {p.category || "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {loading ? (
                        <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded" />
                      ) : (
                        `Rs. ${Number(p.price || 0).toLocaleString()}`
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {p.stock ?? "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          p.status === "In Stock"
                            ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                            : p.status === "Low Stock"
                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
                            : "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
                        }`}
                      >
                        {p.status || "-"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex space-x-3">
                        <button className="text-orange-600 hover:text-orange-900 dark:hover:text-orange-400">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-900 dark:hover:text-red-400">
                          <Trash className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Low Stock Alert */}
      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
        <div className="flex items-center">
          <AlertCircle className="w-5 h-5 text-yellow-400 mr-2" />
          <p className="text-sm text-yellow-800 dark:text-yellow-200">
            Some products are running low on stock. Consider restocking soon.
          </p>
        </div>
      </div>

      {isAddOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => !creating && setIsAddOpen(false)}
        >
          <div
            className="w-full max-w-2xl bg-white dark:bg-gray-900 rounded-lg p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-semibold mb-4">Add Product</h2>
            {error && <p className="text-sm text-red-600 mb-2">{error}</p>}
            <form
              onSubmit={handleCreate}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              <div>
                <label className="block text-sm mb-1">Name</label>
                <input
                  className="w-full px-3 py-2 rounded border dark:bg-gray-800"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Brand</label>
                <input
                  className="w-full px-3 py-2 rounded border dark:bg-gray-800"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm mb-1">Description</label>
                <textarea
                  className="w-full px-3 py-2 rounded border dark:bg-gray-800"
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Price (Rs.)</label>
                <input
                  type="number"
                  min={0}
                  className="w-full px-3 py-2 rounded border dark:bg-gray-800"
                  value={price}
                  onChange={(e) =>
                    setPrice(
                      e.target.value === "" ? "" : Number(e.target.value)
                    )
                  }
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Category</label>
                <select
                  className="w-full px-3 py-2 rounded border dark:bg-gray-800"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option>Smartphones</option>
                  <option>Tablets</option>
                  <option>Accessories</option>
                </select>
              </div>
              <div>
                <label className="block text-sm mb-1">Stock</label>
                <input
                  type="number"
                  min={0}
                  className="w-full px-3 py-2 rounded border dark:bg-gray-800"
                  value={stock}
                  onChange={(e) =>
                    setStock(
                      e.target.value === "" ? "" : Number(e.target.value)
                    )
                  }
                />
              </div>
              <div>
                <label className="block text-sm mb-1">
                  Image URLs (comma separated)
                </label>
                <input
                  className="w-full px-3 py-2 rounded border dark:bg-gray-800"
                  value={images}
                  onChange={(e) => setImages(e.target.value)}
                  placeholder="https://.../img1.jpg, https://.../img2.jpg"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm mb-1">
                  Specifications (key=value per line)
                </label>
                <textarea
                  className="w-full px-3 py-2 rounded border dark:bg-gray-800"
                  rows={4}
                  value={specsText}
                  onChange={(e) => setSpecsText(e.target.value)}
                  placeholder={"RAM=8GB\nStorage=256GB\nBattery=5000mAh"}
                />
              </div>
              <div className="sm:col-span-2 flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  className="px-3 py-2 rounded border"
                  disabled={creating}
                  onClick={() => setIsAddOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-3 py-2 rounded"
                  disabled={creating}
                >
                  {creating ? (
                    <span className="inline-block h-4 w-4 border-2 border-white/70 border-t-transparent rounded-full animate-spin" />
                  ) : null}
                  {creating ? "Creating..." : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
