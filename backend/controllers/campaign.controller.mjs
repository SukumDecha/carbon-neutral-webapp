import {
  addDonation,
  createCampaign,
  findAllCampaigns,
  updateCampaign,
} from "../services/campaign.service.mjs";
import { handleErrors } from "../utils/helpers.mjs";
import { Router } from "express";
import { handleGuard } from "./middlewares/jwt.middleware.mjs";

const router = Router();

router.get("/api/campaigns", async (_req, res) => {
  try {
    const campaigns = await findAllCampaigns();
    res.json(campaigns);
  } catch (error) {
    handleErrors(error, res, "Error fetching campaigns");
  }
});

//Api when we scan only
router.patch("/api/campaigns/:id", async (req, res) => {
  const { id: userId } = req.user;
  const { id: campaignId } = req.params;

  const { filter, amount } = req.query;

  if (filter === "donation") {
    try {
      await addDonation(campaignId, userId, amount);
      return res.status(200).json({ message: "Donation added successfully" });
    } catch (error) {
      handleErrors(error, res, "Error adding donation");
    }
  } else if (filter === "top_donations") {
    try {
      const topDonations = await getTopDonations(req.params.id);
      res.status(200).json(topDonations);
    } catch (error) {
      handleErrors(error, res, "Error fetching top donations");
    }
  } else {
    try {
      await updateCampaign(req.params.id, req.body);
      res.status(200).json({ message: "Campaign updated successfully" });
    } catch (error) {
      handleErrors(error, res, "Error updating campaign");
    }
  }
});

router.post("/api/campaigns", handleGuard, async (req, res) => {
  try {
    await createCampaign(req.body);
    res.status(201).json({ message: "Campaign created successfully" });
  } catch (error) {
    handleErrors(error, res, "Error creating campaign");
  }
});

router.delete("/api/campaigns/:id", handleGuard, async (req, res) => {
  const { campaignId } = req.params;

  try {
    await deleteCampaign(campaignId);
    res.status(200).json({ message: "Campaign deleted successfully" });
  } catch (error) {
    handleErrors(error, res, "Error deleting campaign");
  }
});

export default router;
