import { Tag } from "antd";
import Button from "../../../shared/components/Button";
import { getImagePath } from "../../../shared/utils/helper.utils";
import { IClaimHistory } from "../user.type";
import { Link } from "react-router-dom";

interface IProps {
  cart: IClaimHistory;
}

export const History = ({ cart }: IProps) => {
  return (
    <div className="-item">
      <div className="-image">
        <img src={getImagePath(cart.image_url)} alt={cart.name} />
      </div>
      <div className="-info">
        <div className="-col">
          <div className="-flex">
            <p className="-bold -productName">{cart.name}</p>
            <Tag color="orange">{cart.point_cost} points</Tag>
          </div>

          <p>{cart.description}</p>
        </div>
        <div className="-col -right">
          <p>x{cart.quantity}</p>
          <br />
          <p className="-bold">{cart.total_points} total points </p>
          <Link to={`/product/${cart.id}`}>
            <Button>
              <span>REDEEM AGAIN</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
