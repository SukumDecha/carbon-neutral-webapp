import { IProduct } from "../product/product.type";

export type ICart = {
  id: string;

  ownerId: number;
  quantity: number;
  product: IProduct;
};
