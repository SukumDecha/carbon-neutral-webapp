import { Router } from "express";
import { logout, register } from "../services/auth.service.mjs";
import { handleGuard, handleLogin } from "./middlewares/jwt.middleware.mjs";

const router = Router();

router.post("/api/auth/login", handleLogin, (request, response) => {
  console.log("Logged in user:", request.user);
  return response.sendStatus(200);
});

router.post("/api/auth/register", async (request, response) => {
  try {
    await register(request.body);
    return response.sendStatus(201);
  } catch (error) {
    return response.status(400).send(error.message);
  }
});

router.get("/api/auth/status", handleGuard, (request, response) => {
  console.log("User status:", request.user);
  return request.user ? response.json(request.user) : response.sendStatus(401);
});

router.post("/api/auth/logout", handleGuard, (request, response) => {
  if (!request.user) {
    return response.sendStatus(401);
  }

  response.clearCookie("token");
});

export default router;
