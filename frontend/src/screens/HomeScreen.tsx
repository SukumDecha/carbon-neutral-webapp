import { CarFront } from "lucide-react";
import { Store } from "lucide-react";
import { CalendarCheck } from "lucide-react";
import { Trees } from "lucide-react";
import { Fish } from "lucide-react";
import { Utensils } from "lucide-react";
import { Link } from "react-router-dom";
import { useProduct } from "../features/product/hooks/useProduct";
import Loading from "../shared/components/Loading";
import EmptyBox from "../shared/components/EmptyBox";
import { getImagePath } from "../shared/utils/helper.utils";

const linkTo = [
  {
    title: "Car",
    path: "/tracker",
    img: <CarFront size={32} />,
  },
  {
    title: "Exchange",
    path: "/store",
    img: <Store size={32} />,
  },
  {
    title: "Event",
    path: "/event",
    img: <CalendarCheck size={32} />,
  },
  {
    title: "Tree",
    path: "/campaign/tree",
    img: <Trees size={32} />,
  },
  {
    title: "Coral",
    path: "/campaign/coral/coral",
    img: <Fish size={32} />,
  },
  {
    title: "Food",
    path: "/campaign/transportation",
    img: <Utensils size={32} />,
  },
];

const HomeScreen = () => {
  const { data: products, isLoading } = useProduct();

  if (isLoading) return <Loading />;

  if (!products) return <EmptyBox />;

  return (
    <div className="HomeScreen">
      <div className="-intro">Let’s save our planet Together</div>
      <div className="-navigation">
        {linkTo.map((LINK, idx) => (
          <a href={LINK.path} key={idx}>
            <h1>{LINK.img}</h1>
            <p>{LINK.title}</p>
          </a>
        ))}
      </div>
      <div className="-boxes">
        <div className="animated-earth">
          <img src="" alt="Earth" className="rotate" />
        </div>
      </div>
      <div className="-product-list">
        {products.map((product) => (
          <div className="-item" key={product.id}>
            <img src={getImagePath(product.image_url)} alt={product.name} />
            <p>{product.name}</p>
            <p>{product.point_cost} Point</p>
            <Link to={`/product/${product.id}`}>
              <button>View </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
export default HomeScreen;
