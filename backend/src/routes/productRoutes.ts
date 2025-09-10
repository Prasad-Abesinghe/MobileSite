import express from "express";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  updateStock,
  seedSampleProducts,
} from "../controllers/productController";
import { protect, admin } from "../middleware/auth";

const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProductById);

// Admin routes
router.post("/seed", protect, admin, seedSampleProducts);
router.post("/", protect, admin, createProduct);
router.put("/:id", protect, admin, updateProduct);
router.delete("/:id", protect, admin, deleteProduct);
router.put("/:id/stock", protect, admin, updateStock);

export default router;
