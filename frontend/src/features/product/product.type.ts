export type IProduct = {
  id: number;
  name: string;
  image_url: string;
  point_cost: number;
  description: string;
  quantity: number;
};

export type IAddProduct = {
  name: string;
  description: string;
  point_cost: number;
  quantity: number;
  image: {
    fileList: { originFileObj: File }[];
  };
};

export type IUpdateProduct = {
  id?: number;
  name?: string;
  description?: string;
  point_cost?: number;
  quantity?: number;
  image?: {
    fileList: { originFileObj: File }[];
  };
};
