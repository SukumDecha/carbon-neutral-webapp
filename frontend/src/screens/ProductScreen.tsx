import { useParams } from "react-router-dom";
import ProductItem from "../features/product/components/ProductItem";
import { useProductById } from "../features/product/hooks/useProduct";
import EmptyBox from "../shared/components/EmptyBox";
import { useSelector } from "react-redux";
import { RootState } from "../stores/store";

const ProductScreen = () => {
  const { id } = useParams();
  const { data: product } = useProductById(id!);
  const items = useSelector((state: RootState) => state.carts);

  console.log(items);
  if (!product) {
    return (
      <EmptyBox>
        <p>Product not found</p>
      </EmptyBox>
    );
  }

  return <ProductItem product={product} />;
};

export default ProductScreen;
