import { Router } from "express";
import {
  createUser,
  findAllUsers,
  findUserById,
  updateUser,
} from "../services/user.service.mjs";
import { handleErrors } from "../utils/helpers.mjs";

const router = Router();

// need middleWares to check if user is admin or not
router.get("/api/users", async (_req, res) => {
  try {
    const users = await findAllUsers();
    res.status(200).json(users);
  } catch (error) {
    handleErrors(res, error, "Failed to fetch users");
  }
});

router.get("/api/users/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await findUserById(id);
    res.status(200).json(user);
  } catch (error) {
    handleErrors(res, error, "Failed to fetch user");
  }
});

router.patch("/api/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await updateUser(id, req.body);
    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    handleErrors(res, error, "Failed to update user");
  }
});

export default router;
