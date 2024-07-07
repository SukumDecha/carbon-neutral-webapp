import passport from "passport";
import { Router } from "express";
import { logout, register } from "../services/auth.service.mjs";
import { isAuthenticated } from "./middlewares/middleware.mjs";

const router = Router();

router.post(
  "/api/auth/login",
  passport.authenticate("local"),
  (_request, response) => {
    response.sendStatus(200);
  }
);

router.post("/api/auth/register", async (request, response) => {
  try {
    await register(request.body);
    return response.sendStatus(201);
  } catch (error) {
    return response.status(400).send(error.message);
  }
});

router.get("/api/auth/status", (request, response) => {
  return request.user ? response.send(request.user) : response.sendStatus(401);
});

router.post("/api/auth/logout", isAuthenticated, (request, response) => {
  if (!request.user) {
    return response.sendStatus(401);
  }

  logout();
});

export default router;
