import { Router } from "express";
import {
  addProduct,
  updateProduct,
  removeProduct,
  sellProduct,
  findAllProducts,
  findProductById,
} from "../services/product.service.mjs";
import { handleErrors } from "../utils/helpers.mjs";
import { isAuthenticated } from "./middlewares/middleware.mjs";
const router = Router();

// Get all products
router.get("/api/products", async (_req, res) => {
  try {
    const products = await findAllProducts();
    res.status(200).json(products);
  } catch (error) {
    handleErrors(res, error, "Failed to fetch products");
  }
});

// Get product by Id
router.get("/api/products/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const product = await findProductById(id);
    res.status(200).json(product);
  } catch (error) {
    handleErrors(res, error, "Failed to fetch product");
  }
});

// Add Product
router.post("/api/products", isAuthenticated, async (req, res) => {
  try {
    await addProduct(req.body);
    res.status(200).json({ message: "Product created successfully" });
  } catch (error) {
    handleErrors(res, error, "Failed to create product");
  }
});

// Update Product
router.patch("/api/products/:id", isAuthenticated, async (req, res) => {
  const { id } = req.params;

  try {
    await updateProduct(id, req.body);
    res.status(200).json({ message: "Product updated successfully" });
  } catch (error) {
    handleErrors(res, error, "Failed to update product");
  }
});

// Remove Product
router.delete("/api/products/:id", isAuthenticated, async (req, res) => {
  const { id } = req.params;

  try {
    await removeProduct(id);
    res.status(200).json({ message: "Product removed successfully" });
  } catch (error) {
    handleErrors(res, error, "Failed to remove product");
  }
});

// Sell Product
router.put("/api/products/:id/sell", async (req, res) => {
  const { id: productId } = req.params;
  const { id: userId } = req.user;
  const { quantity } = req.body;
  try {
    await sellProduct(productId, quantity, userId);
    res.status(200).json({ message: "Product sold successfully" });
  } catch (error) {
    handleErrors(res, error, "Failed to sell product");
  }
});

export default router;