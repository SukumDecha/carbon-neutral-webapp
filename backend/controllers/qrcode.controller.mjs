import { Router } from "express";
import { join } from "path";
import { handleErrors } from "../utils/helpers.mjs";
import { readFile } from "fs/promises";
const router = Router();

router.get("/api/qrcodes", async (req, res) => {
  const { url } = req.query;
  try {
    const qrCodeUrl = await QRCode.toDataURL(url);
    res.status(200).json({ qrCodeUrl });
  } catch (err) {
    console.error("Error generating QR code:", err);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/api/uploads/:directoryName/:fileName", async (req, res) => {
  const { directoryName, fileName } = req.params;

  const publicDir = join("public", "uploads");
  const filePath = join(publicDir, directoryName, fileName);

  try {
    const file = await readFile(filePath);
    res.status(200).send(file);
  } catch (error) {
    handleErrors(res, error, "Failed to fetch file");
  }
});

export default router;
