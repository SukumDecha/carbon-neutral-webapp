import { Router } from "express";

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

export default router;
