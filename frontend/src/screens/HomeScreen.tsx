import { CarFront } from "lucide-react";
import { Store } from "lucide-react";
import { CalendarCheck } from "lucide-react";
import { Trees } from "lucide-react";
import { Fish } from "lucide-react";
import { Utensils } from "lucide-react";
import { Link } from "react-router-dom";

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
    path: "/campaign",
    img: <Trees size={32} />,
  },
  {
    title: "Coral",
    path: "/campaign/coral",
    img: <Fish size={32} />,
  },
  {
    title: "Food",
    path: "/campaign/transportation",
    img: <Utensils size={32} />,
  },
];

const HomeScreen = () => {
  return (
    <div className="HomeScreen">
      <div className="intro">Let’s save our planet Together</div>
      <div className="main">
        <div className="pathTo">
          {linkTo.map((LINK, idx) => (
            <a href={LINK.path} key={idx}>
              <h1>{LINK.img}</h1>
              <p>{LINK.title}</p>
            </a>
          ))}
        </div>
        <div className="boxes">
          <div className="animated-earth">
            <img src="earth.jpg" alt="Earth" className="rotate" />
          </div>
        </div>
        <div className="Featured">
          <div className="-item">
            <img src="shirt.png" alt="" />
            <p>T-Shirt</p>
            <p>100 Point</p>
            {/* fix link to item name link */}
            <Link to={`/product/T-Shirt`}>
              <button>Buy</button>
            </Link>
          </div>
          <div className="-item">
          <img src="shirt.png" alt="" />
            <p>T-Shirt</p>
            <p>100 Point</p>
            {/* fix link to item name link */}
            <Link to={`/product/T-Shirt`}>
              <button>Buy</button>
            </Link>
          </div>
          <div className="-item">s</div>
          <div className="-item">s</div>

        </div>
      </div>
    </div>
  );
};
export default HomeScreen;
