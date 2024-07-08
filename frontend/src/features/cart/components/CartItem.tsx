import { ICart } from "../cart.type";

interface IProps {
  cart: ICart;
}

const CartItem = ({ cart }: IProps) => {
  const incrementQuantity = () => {};

  const decreaseQuantity = () => {};

  const { product } = cart;

  return (
    <div className="product-item">
      <div className="-image">
        <img src={product.image_url} alt={product.name} />
      </div>
      <div className="-info">
        <h3>{product.name}</h3>
        <p>{product.point_cost} Point</p>
        <div className="-quantity">
          <button onClick={() => decreaseQuantity()}>-</button>
          <span> {cart.quantity} </span>
          <button onClick={() => incrementQuantity()}>+</button>
        </div>
      </div>
      <div className="-button">
        <button>Redeem</button>
        <button>Remove</button>
      </div>
    </div>
  );
};

export default CartItem;
