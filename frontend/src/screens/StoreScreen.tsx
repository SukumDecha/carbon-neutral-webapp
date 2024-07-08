import { useState } from "react";
import { Link } from "react-router-dom";
import { useProduct } from "../features/product/hooks/useProduct";
import { Filter } from "lucide-react";
import { getImagePath } from "../shared/utils/helper.utils";
import Button from "../shared/components/Button";
import EmptyBox from "../shared/components/EmptyBox";
import Loading from "../shared/components/Loading";

function StoreScreen() {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: products, isLoading } = useProduct();

  if (isLoading) return <Loading />;

  if (!products) return <EmptyBox />;

  const filteredItems = products.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="Storecreen">
      <div className="-searchPanel">
        <Filter stroke="#F9EEDA" />
        <input
          type="search"
          name="search"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button type="secondary">Search</Button>
      </div>
      <div className="itemLayout">
        {filteredItems.length === 0 ? (
          <EmptyBox>
            <p>There is no product at the moment</p>
          </EmptyBox>
        ) : (
          filteredItems.map((item, idx) => (
            <div className="-item" key={idx}>
              <img src={getImagePath(item.image_url)} alt="" />
              <p>{item.name}</p>
              <p>{item.point_cost} Point</p>
              <Link to={`/product/${item.name}`}>
                <Button>Buy</Button>
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default StoreScreen;
