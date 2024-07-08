import { Button, Card } from "antd";
import { getImagePath } from "../../../../shared/utils/helper.utils";
import Meta from "antd/es/card/Meta";
import { useNavigate } from "react-router-dom";
import { IProduct } from "../../product.type";
import { useDeleteProduct } from "../../hooks/useProduct";
import toast from "react-hot-toast";

interface IProps {
  product: IProduct;
}
const ProductPreview = ({ product }: IProps) => {
  const { mutateAsync } = useDeleteProduct();
  const navigate = useNavigate();

  const handleRemove = async () => {
    try {
      await mutateAsync(product.id);
      toast.success("Product deleted successfully");
    } catch (error) {
      toast.error("Failed to delete product");
    }
  };

  const handleEdit = () => {
    navigate(`/product/edit/${product.id}`);
  };

  const generateDescription = (description: string) => {
    if (description.length > 100) {
      description = description.substring(0, 100) + "...";
    }

    return (
      <div className="-desc">
        <p>{description}</p>
        <div className="-btn">
          <Button onClick={handleEdit}>Edit</Button>
          <Button type="primary" danger onClick={handleRemove}>
            Delete
          </Button>
        </div>
      </div>
    );
  };
  return (
    <Card
      hoverable
      style={{ width: 240 }}
      className="-campaign-item"
      cover={<img alt="example" src={getImagePath(product.image_url)} />}
    >
      <Meta
        title={product.name}
        description={generateDescription(product.description)}
      />
    </Card>
  );
};

export default ProductPreview;
