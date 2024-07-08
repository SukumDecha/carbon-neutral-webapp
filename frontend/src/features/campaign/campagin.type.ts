export type ICampaign = {
  id: number;
  title: string;
  content: string;
  image_url: string;
  donation_goal: string;
  total_donation: string;
  startDate: string;
  endDate: string;
};

export type IAddCampaign = Omit<
  ICampaign,
  "id" | "total_donation" | "startDate" | "endDate"
> & {
  dateRange?: [Date, Date];
  startDate: string;
  endDate: string;
  image: {
    fileList: { originFileObj: File }[];
  };
};

export type IUpdateCampaign = Partial<ICampaign> & {
  id: number;
  image?: {
    fileList: { originFileObj: File }[];
  };
};
