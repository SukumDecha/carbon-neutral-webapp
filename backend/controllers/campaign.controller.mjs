import {
  addDonation,
  createCampaign,
  findAllCampaigns,
  findCampaignByName,
  updateCampaign,
  getTopDonors,
} from "../services/campaign.service.mjs";
import { handleErrors } from "../utils/helpers.mjs";
import { Router } from "express";
import { handleGuard } from "./middlewares/jwt.middleware.mjs";
import multer from "multer";

const router = Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

router.get("/api/campaigns", async (_req, res) => {
  try {
    const campaigns = await findAllCampaigns();
    res.json(campaigns);
  } catch (error) {
    handleErrors(res, error, "Error fetching campaigns");
  }
});

router.get("/api/campaigns/:name", async (req, res) => {
  console.log(req.query);
  const { filter, amount, userId } = req.query;

  const campaign = await findCampaignByName(req.params.name);

  if (filter === "donation") {
    try {
      await addDonation(campaign.id, userId, amount);
      return res.status(200).json({ message: "Donation added successfully" });
    } catch (error) {
      handleErrors(res, error, "Error adding donation");
    }
  } else if (filter === "top_donations") {
    try {
      const topDonations = await getTopDonors(campaign.id);
      res.status(200).json(topDonations);
    } catch (error) {
      handleErrors(res, error, "Error fetching top donations");
    }
  } else {
    try {
      res.json(campaign);
    } catch (error) {
      handleErrors(res, error, "Error fetching campaign");
    }
  }
});

router.get("/api/campaigns/:name", async (req, res) => {
  try {
    const campaign = await findCampaignByName(req.params.name);
    res.json(campaign);
  } catch (error) {
    handleErrors(res, error, "Error fetching campaign");
  }
});

//Api when we scan only
router.patch(
  "/api/campaigns/:id",
  // handleGuard,
  upload.single("image"),
  async (req, res) => {
    const updatedCampaign = {
      ...req.body,
      image: req.file,
    };

    console.log(updatedCampaign);

    try {
      await updateCampaign(req.params.id, updatedCampaign);
      res.status(200).json({ message: "Campaign updated successfully" });
    } catch (error) {
      handleErrors(res, error, "Error updating campaign");
    }
  }
);

router.post(
  "/api/campaigns",
  // handleGuard,
  upload.single("image"),
  async (req, res) => {
    const createdCampaign = {
      ...req.body,
      image: req.file,
    };
    try {
      await createCampaign(createdCampaign);
      res.status(201).json({ message: "Campaign created successfully" });
    } catch (error) {
      handleErrors(res, error, "Error creating campaign");
    }
  }
);

router.delete("/api/campaigns/:id", handleGuard, async (req, res) => {
  const { campaignId } = req.params;

  try {
    await deleteCampaign(campaignId);
    res.status(200).json({ message: "Campaign deleted successfully" });
  } catch (error) {
    handleErrors(res, error, "Error deleting campaign");
  }
});

export default router;
