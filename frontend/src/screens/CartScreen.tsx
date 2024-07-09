import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../stores/store";
import { Button } from "antd";
import { Link } from "react-router-dom";
import { useProduct } from "../features/product/hooks/useProduct";
import { useEffect } from "react";
import { setCart } from "../stores/cartSlicer";
import CartItem from "../features/cart/components/CartItem";
import EmptyBox from "../shared/components/EmptyBox";
import Loading from "../shared/components/Loading";

const CartScreen = () => {
  const dispatch = useDispatch();
  const carts = useSelector((state: RootState) => state.carts.carts);
  const { data: products, isLoading } = useProduct();

  useEffect(() => {
    if (isLoading) return;

    const newCarts = carts.filter((cart) => {
      return products!.find((product) => product.id === cart.product.id);
    });
    dispatch(setCart(newCarts));
  }, [products, isLoading]);

  if (isLoading) return <Loading />;

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
