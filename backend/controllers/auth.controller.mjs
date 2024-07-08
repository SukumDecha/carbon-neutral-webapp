import { Router } from "express";
import { logout, register, login, getMe } from "../services/auth.service.mjs";
import { handleGuard } from "./middlewares/jwt.middleware.mjs";

const router = Router();

router.post("/api/auth/login", login);

router.post("/api/auth/register", async (request, response) => {
  try {
    await register(request.body);
    return response.sendStatus(201);
  } catch (error) {
    return response.status(400).send(error.message);
  }
});

router.get("/api/auth/status", handleGuard, getMe);

router.post("/api/auth/logout", handleGuard, logout);

export default router;
