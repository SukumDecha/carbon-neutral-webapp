export type IProduct = {
  id: number;
  name: string;
  image_url: string;
  point_cost: number;
  description: string;
  quantity: number;
};

export type IAddProduct = Omit<IProduct, "id"> & {
  image: {
    fileList: { originFileObj: File }[];
  };
};

export type IUpdateProduct = Partial<IProduct> & {
  id: number;
  image?: {
    fileList: { originFileObj: File }[];
  };
};
