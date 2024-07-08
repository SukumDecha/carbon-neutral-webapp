import { IAddCampaign, ICampaign, IUpdateCampaign } from "./campagin.type";

// Fetch all products
export const findAllCampaigns = async () => {
  const res = await fetch("http://localhost:3000/api/campaigns", {
    method: "GET",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch product list");
  }
  return (await res.json()) as ICampaign[];
};

export const findCampaignById = async (campaignId: string) => {
  const res = await fetch(`http://localhost:3000/api/campaigns/${campaignId}`, {
    method: "GET",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch product");
  }

  return (await res.json()) as ICampaign;
};

export const createCampaign = async (data: IAddCampaign) => {
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("content", data.content);
  formData.append("startDate", data.startDate);
  formData.append("endDate", data.endDate);
  formData.append("donation_goal", data.donation_goal);
  formData.append("image", data.image.fileList[0].originFileObj);

  const res = await fetch(`http://localhost:3000/api/campaigns`, {
    method: "POST",
    body: formData,
    credentials: "include",
  });

  return { success: res.ok };
};

export const updateCampaign = async (data: IUpdateCampaign) => {
  const formData = new FormData();
  if (data.title) formData.append("title", data.title);
  if (data.content) formData.append("content", data.content);
  if (data.startDate) formData.append("startDate", data.startDate);
  if (data.endDate) formData.append("endDate", data.endDate);
  if (data.image)
    formData.append("image", data.image.fileList[0].originFileObj);

  const res = await fetch(`http://localhost:3000/api/campaigns/${data.id}`, {
    method: "PATCH",
    body: formData,
    credentials: "include",
  });

  return { success: res.ok };
};

export const deleteCampaign = async (id: number) => {
  const res = await fetch(`http://localhost:3000/api/campaigns/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  return { success: res.ok };
};
