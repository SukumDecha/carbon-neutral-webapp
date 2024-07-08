import { useSelector } from "react-redux";
import CartItem from "../features/cart/components/CartItem";
import { RootState } from "../stores/store";
import EmptyBox from "../shared/components/EmptyBox";
import { Button } from "antd";
import { Link } from "react-router-dom";

const CartScreen = () => {
  const carts = useSelector((state: RootState) => state.carts.carts);

  if (carts.length === 0) {
    return (
      <EmptyBox>
        <p>Cart is empty</p>
        <Link to="/exchange">
          <Button>Let's add some</Button>
        </Link>
      </EmptyBox>
    );
  }
  return (
    <div className="CartScreen">
      {carts.map((cart, idx) => {
        return <CartItem cart={cart} key={idx} />;
      })}
    </div>
  );
};

export default CartScreen;
