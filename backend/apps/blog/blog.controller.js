import { findAll } from "./blog.service";
import express from "express";

export const router = express.Router();

router.get("/blogs", (req, res) => {
  return findAll(req, res);
});
