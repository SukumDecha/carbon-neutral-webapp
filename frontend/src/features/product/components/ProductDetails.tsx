import { Truck } from "lucide-react";
import { getImagePath } from "../../../shared/utils/helper.utils";
import { useParams } from "react-router-dom";
import { useProductById } from "../hooks/useProduct";
import Loading from "../../../shared/components/Loading";
import EmptyBox from "../../../shared/components/EmptyBox";
import { Tag } from "antd";

const ProductDetails = () => {
  const { id } = useParams();
  const { data: product, isLoading } = useProductById(id!);

  if (isLoading) return <Loading />;
  if (!product)
    return (
      <EmptyBox>
        <p>Product Not found</p>
      </EmptyBox>
    );

  return (
    <div className="product-item">
      <img src={getImagePath(product.image_url)} alt={product.name} />

      <div className="-line"></div>

      <div className="-desc">
        <div className="-title">
          <p>{product.name}</p>
          <Tag color="green">{product.point_cost} points</Tag>
        </div>

        <p>Quantity : {product.quantity}</p>
        <p>{product.description}</p>
        <div className="-shipping">
          <p>Free Shipping </p>
          <Truck />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
