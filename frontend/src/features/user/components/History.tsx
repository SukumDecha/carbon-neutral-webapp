import { ICart } from "../../cart/cart.type";

interface IProps {
    cart: ICart;
}

export const History = ({ cart }: IProps) => {
    const { product } = cart;

    return (
      <div className="product-item">
        
        <div className="-image">
          <img src={product.image_url} alt={product.name} />
        </div>
        <div className="-info">
          <h3>{product.name}</h3>
          <p>{product.point_cost} Point</p>
          <p>x{cart.quantity}</p>
        </div>
        
      </div>
    );
}
