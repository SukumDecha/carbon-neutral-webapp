import { executeQuery } from "../utils/helpers.mjs";
import { removeDirFromFile, saveFile } from "../utils/file.mjs";
import { findUserById, updateUserPoints } from "./user.service.mjs";

export const findAllProducts = async () => {
  const query = "SELECT * FROM products";
  return await executeQuery(query, [], false);
};

export const findProductById = async (id) => {
  const query = "SELECT * FROM products WHERE id = ?";
  const params = [id];
  return await executeQuery(query, params);
};

export const addProduct = async (product) => {
  const { name, description, image, point_cost, quantity } = product;

  if (!name || !description || !image || !point_cost || !quantity) {
    throw new Error("Missing required fields for product");
  }

  const image_url = await saveFile(image);

  const query =
    "INSERT INTO products (name, description, image_url, point_cost, quantity) VALUES (?, ?, ?, ?, ?)";
  const params = [name, description, image_url, point_cost, quantity];
  await executeQuery(query, params);
};

export const updateProduct = async (id, product) => {
  const { name, description, image, point_cost, quantity } = product;

  const fieldsToUpdate = {
    ...(name && { name }),
    ...(description && { description }),
    ...(point_cost && { point_cost }),
    ...(quantity && { quantity }),
  };

  if (Object.keys(fieldsToUpdate).length === 0) {
    throw new Error("No fields provided for update");
  }

  if (image) {
    const currentProduct = await findProductById(id);
    removeDirFromFile(currentProduct.image_url);

    fieldsToUpdate.image_url = await saveFile(image);
  }

  const setClause = Object.keys(fieldsToUpdate)
    .map((field) => `${field} = ?`)
    .join(", ");
  const params = [...Object.values(fieldsToUpdate), id];
  const query = `UPDATE products SET ${setClause} WHERE id = ?`;

  await executeQuery(query, params);
};

export const removeProduct = async (id) => {
  const removedProduct = await findProductById(id);
  if (!removedProduct) {
    throw new Error("Product not found");
  }

  const query = "DELETE FROM products WHERE id = ?";
  const params = [id];

  removeDirFromFile(removedProduct.image_url);
  await executeQuery(query, params);
};

export const sellProduct = async (productId, quantity, userId) => {
  const product = await findProductById(productId);
  if (!product) {
    throw new Error("Product not found");
  }

  if (product.quantity < quantity) {
    throw new Error("Not enough quantity to sell");
  }

  const user = await findUserById(userId);
  const totalPoints = quantity * product.point_cost;
  if (!user) {
    throw new Error("User not found");
  }

  if (user.points < totalPoints) {
    throw new Error("User doesn't enough points to buy");
  }

  const query =
    "INSERT INTO claim_product_history (user_id, product_id, quantity) VALUES (?, ?, ?)";
  const params = [userId, productId, quantity];
  await executeQuery(query, params);

  await updateProduct(productId, { quantity: product.quantity - quantity });
  await updateUserPoints(userId, user.points - totalPoints);
};
