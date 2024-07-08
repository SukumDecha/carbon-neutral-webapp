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

const router = Router();

router.get("/api/campaigns", async (_req, res) => {
  try {
    const campaigns = await findAllCampaigns();
    res.json(campaigns);
  } catch (error) {
    handleErrors(res, error, "Error fetching campaigns");
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
router.patch("/api/campaigns/:id", async (req, res) => {
  const userId = req.user.id;
  const { id: campaignId } = req.params;

  const { filter, amount } = req.query;

  if (filter === "donation") {
    try {
      await addDonation(campaignId, userId, amount);
      return res.status(200).json({ message: "Donation added successfully" });
    } catch (error) {
      handleErrors(res, error, "Error adding donation");
    }
  } else if (filter === "top_donations") {
    try {
      const topDonations = await getTopDonors(req.params.id);
      res.status(200).json(topDonations);
    } catch (error) {
      handleErrors(res, error, "Error fetching top donations");
    }
  } else {
    try {
      await updateCampaign(req.params.id, req.body);
      res.status(200).json({ message: "Campaign updated successfully" });
    } catch (error) {
      handleErrors(res, error, "Error updating campaign");
    }
  }
});

router.post("/api/campaigns", handleGuard, async (req, res) => {
  try {
    await createCampaign(req.body);
    res.status(201).json({ message: "Campaign created successfully" });
  } catch (error) {
    handleErrors(res, error, "Error creating campaign");
  }
});

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
