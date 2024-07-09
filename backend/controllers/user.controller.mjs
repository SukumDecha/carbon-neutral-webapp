import { Router } from "express";
import {
  findAllUsers,
  findUserById,
  getClaimHistory,
  getDonationHistory,
  updateUser,
} from "../services/user.service.mjs";
import { handleErrors } from "../utils/helpers.mjs";
import { handleGuard } from "./middlewares/jwt.middleware.mjs";
import multer from "multer";
import jwt from "jsonwebtoken";

const router = Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

// need middleWares to check if user is admin or not
router.get("/api/users", async (_req, res) => {
  try {
    const users = await findAllUsers();
    res.status(200).json(users);
  } catch (error) {
    handleErrors(res, error, "Failed to fetch users");
  }
});

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

router.patch(
  "/api/users",
  handleGuard,
  upload.single("image"),
  async (req, res) => {
    const id = req.user.id;
    const updatedUser = {
      ...req.body,
      image: req.file,
    };

    try {
      await updateUser(id, updatedUser);

      const { password, ...userWithoutPassword } = await findUserById(id);

      const token = jwt.sign(
        { user: userWithoutPassword },
        process.env.SECRET_TOKEN,
        {
          expiresIn: "24h",
        }
      );

      req.user = userWithoutPassword;

      res.cookie("accessToken", token, {
        httpOnly: false,
        sameSite: "None",
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
      });

      return res
        .status(200)
        .json({ accessToken: token, message: "User update successfully" });
    } catch (error) {
      handleErrors(res, error, "Failed to update user");
    }
  }
);

router.get("/api/claimHistory", handleGuard, async (req, res) => {
  try {
    const history = await getClaimHistory(req.user.id);

    res.status(200).json(history);
  } catch (error) {
    handleErrors(res, error, "Failed to fetch user");
  }
});

router.get("/api/donationHistory", handleGuard, async (req, res) => {
  try {
    const history = await getDonationHistory(req.user.id);

    res.status(200).json(history);
  } catch (error) {
    handleErrors(res, error, "Failed to fetch user");
  }
});

export default router;
