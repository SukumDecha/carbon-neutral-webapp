import { CirclePlus, ShoppingCart, Truck } from "lucide-react";
import {
  generateRandomNumber,
  getImagePath,
} from "../../../shared/utils/helper.utils";
import { Link, useParams } from "react-router-dom";
import { useProductById } from "../hooks/useProduct";
import Loading from "../../../shared/components/Loading";
import EmptyBox from "../../../shared/components/EmptyBox";
import { Tag } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { addCart } from "../../../stores/cartSlicer";
import { useUser } from "../../user/hooks/useUser";
import toast from "react-hot-toast";
import { ICart } from "../../cart/cart.type";
import { RootState } from "../../../stores/store";

const ProductDetails = () => {
  const dispatch = useDispatch();

  const { id } = useParams();
  const { data: product, isLoading } = useProductById(id!);
  const { data: user } = useUser();
  const cart = useSelector((state: RootState) => state.carts.carts);

  const handleAddToCart = () => {
    if (cart.find((item: ICart) => item.product.id === product!.id)) {
      toast.error("Product already in cart");
      return;
    }

    dispatch(
      addCart({
        id: generateRandomNumber(),

        ownerId: user!.id,
        quantity: 1,
        product: product!,
      })
    );

    toast.success("Product added to cart");
  };

  if (isLoading) return <Loading />;
  if (!product)
    return (
      <EmptyBox>
        <p>Product Not found</p>
      </EmptyBox>
    );

  return (
    <>
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
      <div className="footer-shop">
        <div className="-wrap">
          <div className="-col" onClick={handleAddToCart}>
            <CirclePlus />
            <p>Add to Basket</p>
          </div>
        </div>

        <div className="-wrap">
          <Link to="/cart">
            <div className="-col">
              <ShoppingCart />
              <p>Exchange</p>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
