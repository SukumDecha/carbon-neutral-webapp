import { useDispatch } from "react-redux";
import { getImagePath } from "../../../shared/utils/helper.utils";
import { ICart } from "../cart.type";
import { updateCartQuantity, removeCart } from "../../../stores/cartSlicer";

import { useClaimProduct } from "../../product/hooks/useProduct";

import { Button } from "antd";

interface IProps {
  cart: ICart;
}

const CartItem = ({ cart }: IProps) => {
  const dispatch = useDispatch();
  const { mutateAsync } = useClaimProduct();

  const incrementQuantity = () => {
    dispatch(updateCartQuantity({ id: cart.id, quantity: cart.quantity + 1 }));
  };

  const decreaseQuantity = () => {
    if (cart.quantity === 1) {
      dispatch(removeCart(cart.id));
      return;
    }

    dispatch(updateCartQuantity({ id: cart.id, quantity: cart.quantity - 1 }));
  };

  const handleRedeem = async () => {
    await mutateAsync({ id: cart.product.id, quantity: cart.quantity });
    handleRemove();
  };

  const handleRemove = () => {
    dispatch(removeCart(cart.id));
  };

  const { product } = cart;

  return (
    <div className="cart-item">
      <div className="-wrap">
        <div className="-image">
          <img src={getImagePath(product.image_url)} alt={product.name} />
        </div>
        <div className="-info">
          <h3>{product.name}</h3>
          <p>{product.point_cost} Point</p>
          <div className="-quantity">
            <button onClick={decreaseQuantity}>-</button>
            <span> {cart.quantity} </span>
            <button onClick={incrementQuantity}>+</button>
          </div>
        </div>
      </div>

      <div className="-button">
        <Button onClick={handleRedeem}>Redeem</Button>
        <Button danger onClick={handleRemove}>
          Remove
        </Button>
      </div>
    </div>
  );
};

export default CartItem;
