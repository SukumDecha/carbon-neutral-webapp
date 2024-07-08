import { Truck } from "lucide-react";
import { IProduct } from "../product.type";
import { getImagePath } from "../../../shared/utils/helper.utils";

interface IProps {
  product: IProduct;
}

const ProductItem = ({ product }: IProps) => {
  return (
    <div className="product">
      <img src={getImagePath(product.image_url)} alt={product.name} />
      <div className="radian"></div>
      <p className="title">{product.name}</p>
      <p className="title">{product.point_cost} Point</p>
      <p>Quantity : {product.quantity}</p>
      <p>{product.description}</p>
      <div className="Free">
        Free Shipping <Truck />
      </div>
    </div>
  );
};

export default ProductItem;
