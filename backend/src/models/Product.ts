import mongoose, { Document, Schema } from "mongoose";

export interface IProduct extends Document {
  name: string;
  brand: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  images: string[];
  specifications: {
    [key: string]: string;
  };
  status: "In Stock" | "Low Stock" | "Out of Stock";
}

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: [true, "Please add a product name"],
    },
    brand: {
      type: String,
      required: [true, "Please add a brand name"],
    },
    description: {
      type: String,
      required: [true, "Please add a description"],
    },
    price: {
      type: Number,
      required: [true, "Please add a price"],
    },
    category: {
      type: String,
      required: [true, "Please add a category"],
      enum: ["Smartphones", "Tablets", "Accessories"],
    },
    stock: {
      type: Number,
      required: [true, "Please add stock quantity"],
      default: 0,
    },
    images: [
      {
        type: String,
        required: [true, "Please add at least one image"],
      },
    ],
    specifications: {
      type: Map,
      of: String,
      required: [true, "Please add specifications"],
    },
    status: {
      type: String,
      enum: ["In Stock", "Low Stock", "Out of Stock"],
      default: "In Stock",
    },
  },
  {
    timestamps: true,
  }
);

// Update status based on stock
productSchema.pre("save", function (next) {
  if (this.stock <= 0) {
    this.status = "Out of Stock";
  } else if (this.stock <= 10) {
    this.status = "Low Stock";
  } else {
    this.status = "In Stock";
  }
  next();
});

export default mongoose.model<IProduct>("Product", productSchema);
