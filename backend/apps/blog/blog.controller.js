import { findAll } from "./blog.service";
import express from "express";

export const router = express.Router();

router.get("/blogs", (req, res) => {
  return findAll(req, res);
});

router.get("/upload:imgName", (req, res) => {
  const imgName = req.params.imgName;

  const filePath = `${__dirname}/uploads/${imgName}`;
  const file = readFile(filePath);

  res.send(file);
});
