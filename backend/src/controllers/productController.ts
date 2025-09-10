import { Request, Response } from "express";
import Product from "../models/Product";

export const getProducts = async (req: Request, res: Response) => {
  try {
    const { category, status, search } = req.query;
    let query: any = {};

    if (category && category !== "all") {
      query.category = category;
    }

    if (status && status !== "all") {
      query.status = status;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { brand: { $regex: search, $options: "i" } },
      ];
    }

    const products = await Product.find(query);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      Object.assign(product, req.body);
      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      await product.remove();
      res.json({ message: "Product removed" });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const updateStock = async (req: Request, res: Response) => {
  try {
    const { quantity } = req.body;
    const product = await Product.findById(req.params.id);

    if (product) {
      product.stock = quantity;
      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Admin: seed sample smartphones
export const seedSampleProducts = async (req: Request, res: Response) => {
  try {
    const samples = [
      {
        name: "iPhone 15 Pro",
        brand: "Apple",
        price: 199999,
        category: "Smartphones",
        stock: 50,
        images: ["/phones/iphone-15-pro.png"],
        description: "Apple iPhone 15 Pro with A17 Pro and Pro cameras",
        specifications: {
          Screen: "6.7-inch Super Retina XDR",
          Processor: "A17 Pro",
          RAM: "8GB",
          Storage: "256GB",
          Battery: "3200mAh",
          Camera: "48MP + 12MP + 12MP + 12MP",
        },
      },
      {
        name: "Samsung Galaxy S24 Ultra",
        brand: "Samsung",
        price: 249999,
        category: "Smartphones",
        stock: 60,
        images: ["/phones/samsung-s24-ultra.png"],
        description: "Samsung flagship with Dynamic AMOLED 2X and 200MP camera",
        specifications: {
          Screen: "6.8-inch Dynamic AMOLED 2X",
          Processor: "Snapdragon 8 Gen 3",
          RAM: "12GB",
          Storage: "512GB",
          Battery: "5000mAh",
          Camera: "200MP + 12MP + 50MP + 10MP",
        },
      },
      {
        name: "Google Pixel 8 Pro",
        brand: "Google",
        price: 179999,
        category: "Smartphones",
        stock: 40,
        images: ["/phones/google-pixel-8-pro.png"],
        description: "Pixel 8 Pro with Tensor G3 and advanced AI features",
        specifications: {
          Screen: "6.7-inch LTPO OLED",
          Processor: "Google Tensor G3",
          RAM: "12GB",
          Storage: "256GB",
          Battery: "5050mAh",
          Camera: "50MP + 48MP + 48MP",
        },
      },
      {
        name: "OnePlus 12",
        brand: "OnePlus",
        price: 159999,
        category: "Smartphones",
        stock: 45,
        images: ["/phones/oneplus-12.png"],
        description: "OnePlus 12 with Snapdragon 8 Gen 3 and LTPO AMOLED",
        specifications: {
          Screen: "6.82-inch LTPO AMOLED",
          Processor: "Snapdragon 8 Gen 3",
          RAM: "16GB",
          Storage: "512GB",
          Battery: "5400mAh",
          Camera: "50MP + 48MP + 64MP",
        },
      },
      {
        name: "Xiaomi 14 Pro",
        brand: "Xiaomi",
        price: 149999,
        category: "Smartphones",
        stock: 55,
        images: ["/phones/xiaomi-14-pro.png"],
        description: "Xiaomi 14 Pro with Snapdragon 8 Gen 3 and LTPO AMOLED",
        specifications: {
          Screen: "6.73-inch LTPO AMOLED",
          Processor: "Snapdragon 8 Gen 3",
          RAM: "12GB",
          Storage: "256GB",
          Battery: "4880mAh",
          Camera: "50MP + 50MP + 50MP + 50MP",
        },
      },
      {
        name: "OPPO Find X7 Ultra",
        brand: "OPPO",
        price: 189999,
        category: "Smartphones",
        stock: 35,
        images: ["/phones/oppo-find-x7-ultra.png"],
        description: "OPPO flagship with quad 50MP cameras",
        specifications: {
          Screen: "6.82-inch LTPO AMOLED",
          Processor: "Snapdragon 8 Gen 3",
          RAM: "16GB",
          Storage: "512GB",
          Battery: "5000mAh",
          Camera: "50MP + 50MP + 50MP + 50MP",
        },
      },
      {
        name: "Vivo X100 Pro",
        brand: "Vivo",
        price: 169999,
        category: "Smartphones",
        stock: 30,
        images: ["/phones/vivo-x100-pro.png"],
        description: "Vivo X100 Pro with professional photography features",
        specifications: {
          Screen: "6.78-inch LTPO AMOLED",
          Processor: "Dimensity 9300",
          RAM: "12GB",
          Storage: "256GB",
          Battery: "5400mAh",
          Camera: "50MP + 50MP + 50MP + 50MP",
        },
      },
      {
        name: "Realme GT 5 Pro",
        brand: "Realme",
        price: 139999,
        category: "Smartphones",
        stock: 50,
        images: ["/phones/realme-gt-5-pro.png"],
        description: "Realme GT 5 Pro with Snapdragon 8 Gen 3",
        specifications: {
          Screen: "6.78-inch LTPO AMOLED",
          Processor: "Snapdragon 8 Gen 3",
          RAM: "12GB",
          Storage: "256GB",
          Battery: "5400mAh",
          Camera: "50MP + 8MP + 32MP + 2MP",
        },
      },
    ];

    // Avoid duplicates by name+brand
    const existing = await Product.find({
      name: { $in: samples.map((s) => s.name) },
    }).select("name brand");
    const existingSet = new Set(
      existing.map((e) => `${e.name}|${(e as any).brand}`)
    );
    const toInsert = samples.filter(
      (s) => !existingSet.has(`${s.name}|${s.brand}`)
    );

    if (toInsert.length === 0) {
      return res.json({ message: "No new products to insert", inserted: 0 });
    }

    const inserted = await Product.insertMany(toInsert);
    res
      .status(201)
      .json({ message: "Seeded products", inserted: inserted.length });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
