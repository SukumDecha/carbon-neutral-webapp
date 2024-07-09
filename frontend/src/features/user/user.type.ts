export type IUser = {
  id: number;
  username: string;
  email: string;
  points: number;
  avatar?: string;
  isAdmin: number;
};

export type IUpdateUser = Partial<IUser> & {
  password?: string;
  avatar?: {
    fileList: { originFileObj: File }[];
  };
};

export type IClaimHistory = {
  id: number;
  name: string;
  description: string;
  quantity: string;
  total_points: string;
  image_url: string;
  point_cost: number;
};

export type IDonateHistory = {
  title: string;
  total: number;
};
