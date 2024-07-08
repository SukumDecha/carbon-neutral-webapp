import { Router } from "express";
import {
  addProduct,
  updateProduct,
  removeProduct,
  sellProduct,
  findAllProducts,
  findProductById,
} from "../services/product.service.mjs";
import multer from "multer";
import { handleErrors } from "../utils/helpers.mjs";
import { handleGuard } from "./middlewares/jwt.middleware.mjs";

const router = Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

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
router.post(
  "/api/products",
  handleGuard,
  upload.single("image"),
  async (req, res) => {
    const productData = {
      name: req.body.name,
      description: req.body.description,
      point_cost: req.body.point_cost,
      quantity: req.body.quantity,
      imagePath: req.file,
    };

    try {
      await addProduct(productData);
      res.status(200).json({ message: "Product created successfully" });
    } catch (error) {
      handleErrors(res, error, "Failed to create product");
    }
  }
);

// Update Product
router.patch(
  "/api/products/:id",
  handleGuard,
  upload.single("image"),
  async (req, res) => {
    const { id } = req.params;

    const updatedProduct = {
      ...req.body,
      imagePath: req.file,
    };

    try {
      await updateProduct(id, updatedProduct);
      res.status(200).json({ message: "Product updated successfully" });
    } catch (error) {
      handleErrors(res, error, "Failed to update product");
    }
  }
);

// Remove Product
router.delete("/api/products/:id", handleGuard, async (req, res) => {
  const { id } = req.params;

  try {
    await removeProduct(id);
    res.status(200).json({ message: "Product removed successfully" });
  } catch (error) {
    handleErrors(res, error, "Failed to remove product");
  }
});

// Sell Product
router.put("/api/sell/:id", handleGuard, async (req, res) => {
  const { id: productId } = req.params;
  const userId = req.user.id;
  const { quantity } = req.query;

  try {
    await sellProduct(productId, quantity, userId);
    res.status(200).json({ message: "Product sold successfully" });
  } catch (error) {
    handleErrors(res, error, "Failed to sell product");
  }
});

export default router;
