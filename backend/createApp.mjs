import express from "express";

import cookieParser from "cookie-parser";

import dotenv from "dotenv";
import cors from "cors";
import router from "./controllers/index.controller.mjs";

dotenv.config();

export function createApp() {
  const app = express();

  app.use(cors({ origin: "http://127.0.0.1:5173", credentials: true }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(cookieParser());

  app.use(router);

  return app;
}
