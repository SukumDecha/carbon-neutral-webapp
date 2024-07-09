export type ICampaign = {
  id: number;
  title: string;
  content: string;
  image_url: string;
  donation_goal: string;
  total_donations: string;
  startDate: string;
  endDate: string;
};

export type IAddCampaign = Omit<
  ICampaign,
  "id" | "total_donations" | "startDate" | "endDate"
> & {
  dateRange?: [Date, Date];
  startDate: string;
  endDate: string;
  image: {
    fileList: { originFileObj: File }[];
  };
};

export type IUpdateCampaign = Partial<IAddCampaign> & {
  id: number;
  image?: {
    fileList: { originFileObj: File }[];
  };
};

export type IDonor = {
  username: string;
  avatar: string;
  total: number;
};
