import express from "express";

import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import dotenv from "dotenv";
import cors from "cors";
import router from "./controllers/index.controller.mjs";
import "./strategies/local-strategy.mjs";

dotenv.config();

export function createApp() {
  const app = express();
  app.use(cors({ origin: "http://localhost:3000", credentials: true }));
  app.use(express.json());
  app.use(cookieParser());
  app.use(
    session({
      secret: process.env.SECRET_TOKEN,
      saveUninitialized: true,
      resave: false,
      cookie: {
        secure: false,
        maxAge: 24 * 60 * 60 * 1000,
      },
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());

  app.use(router);

  return app;
}
