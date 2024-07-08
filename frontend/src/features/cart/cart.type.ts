import { IProduct } from "../product/product.type";

export type ICart = {
  id: number;

  ownerId: number;
  quantity: number;
  product: IProduct;
};
