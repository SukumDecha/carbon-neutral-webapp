import { executeQuery } from "../utils/helpers.mjs";
import { addTotalDonation } from "./user.service.mjs";

export const findAllCampaigns = async () => {
  const query = "SELECT * FROM campaigns";
  return await executeQuery(query, [], false);
};

export const findCampaignById = async (id) => {
  const query = "SELECT * FROM campaigns WHERE id = ?";
  const params = [id];
  return await executeQuery(query, params);
};

export const findCampaignByName = async (name) => {
  const query = "SELECT * FROM campaigns WHERE title = ?";
  const params = [name];
  return await executeQuery(query, params);
};

export const createCampaign = async (campaign) => {
  const { title, description, startDate, endDate, donation_goal, image } =
    campaign;

  if (!title || !description || !startDate || !endDate || !goal || !image) {
    throw new Error("All fields are required");
  }

  const image_url = await saveFile(image);
  const query =
    "INSERT INTO campaigns (title, content, donation_goal, image_url, start_date, end_date) VALUES (?, ?, ?, ?, ?, ?)";
  const params = [
    title,
    description,
    donation_goal,
    image_url,
    startDate,
    endDate,
  ];

  await executeQuery(query, params);
};

export const updateCampaign = async (id, campaign) => {
  const { title, description, startDate, endDate, donation_goal, image } =
    campaign;

  const fieldsToUpdate = {
    ...(title && { title }),
    ...(description && { description }),
    ...(startDate && { startDate }),
    ...(endDate && { endDate }),
    ...(donation_goal && { donation_goal }),
  };

  if (Object.keys(fieldsToUpdate).length === 0) {
    throw new Error("No fields provided for update");
  }

  if (image) {
    const currentCampaign = await findCampaignById(id);
    removeDirFromFile(currentCampaign.image_url);

    fieldsToUpdate.image_url = await saveFile(image);
  }

  const setClause = Object.keys(fieldsToUpdate)
    .map((field) => `${field} = ?`)
    .join(", ");
  const params = [...Object.values(fieldsToUpdate), id];
  const query = `UPDATE campaigns SET ${setClause} WHERE id = ?`;

  await executeQuery(query, params);
};

export const removeCampaign = async (id) => {
  const removedCampaign = await findCampaignById(id);
  removeDirFromFile(removedCampaign.image_url);

  const query = "DELETE FROM campaigns WHERE id = ?";
  const params = [id];
  await executeQuery(query, params);
};

export const getTotalDonations = async (id) => {
  const query =
    "SELECT SUM(amount) AS total FROM donations WHERE campaign_id = ?";
  const params = [id];
  const result = await executeQuery(query, params);
  return result.total;
};

export const getTopDonors = async (id, limit) => {
  const query =
    "SELECT u.name, u.avatar SUM(amount) AS total FROM donations d JOIN user u ON u.id = d.user_id WHERE campaign_id = ? GROUP BY user_id ORDER BY total DESC LIMIT ?";
  const params = [id, limit];
  return await executeQuery(query, params, false);
};

export const addDonation = async (id, userId, amount) => {
  const campaign = await findCampaignById(id);
  if (!campaign) {
    throw new Error("Campaign not found");
  }

  // add donation to donations table
  let query =
    "INSERT INTO donations (campaign_id, user_id, amount) VALUES (?, ?, ?)";
  let params = [id, userId, amount];
  await executeQuery(query, params);

  // update campaign's total_donations
  const totalDonations = await getTotalDonations(id);
  query = "UPDATE campaigns SET total_donations = ? WHERE id = ?";
  params = [totalDonations, id];
  await executeQuery(query, params);

  // update user's total_donations
  await addTotalDonation(userId, amount);
  // update user's points (multiply donation amount by 5)
  await updateUserPoints(userId, amount * 5, true);
};
