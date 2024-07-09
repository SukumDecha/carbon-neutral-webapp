import {
  CircleUserRound,
  ShoppingCart,
  ChevronLeft,
  Settings,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Button from "../Button";

const Header = () => (
  <div className="header">
    <Link to="/profile">
      <div className="-icon">
        <CircleUserRound />
      </div>
    </Link>
    <Button>0 POINT</Button>
  </div>
);

export const HeaderSetting = () => {
  const { pathname } = useLocation();
  const [active, setActive] = useState(false);
  const [activeshop, setActiveshop] = useState(false);
  const [namepath, setNamepath] = useState("");
  const [pathWayback, setPathWayback] = useState("");
  const [pathSetting, setPathSetting] = useState("");

  useEffect(() => {
    const updatePaths = () => {
      switch (true) {
        case pathname === "/personal":
          setNamepath("Personal information");
          setActive(true);
          setPathWayback("/profile");
          break;
        case pathname === "/cart":
          setNamepath("Cart");
          setPathWayback("/exchange");
          break;
        case pathname === "/history":
          setNamepath("Purchase History");
          setActive(true);
          setPathWayback("/profile");
          break;
        case pathname.startsWith("/blogs/"):
          setNamepath("Forums");
          setPathWayback("/blogs");
          break;
        case pathname.endsWith("/statistic"):
          setNamepath("Statistic");
          setPathWayback("/profile");
          break;
        case pathname.startsWith("/product/"):
          setNamepath("Product");
          setActiveshop(true);
          setPathWayback("/exchange");
          setPathSetting("/cart");
          break;
        case pathname === "/exchange":
          setNamepath("Exchange");
          setActiveshop(true);
          setPathWayback("/");
          setPathSetting("/cart");
          break;
        case pathname === "/tracker":
          setNamepath("Tracker");
          setActiveshop(true);
          setPathWayback("/");
          setPathSetting("/cart");
          break;
        default:
          setNamepath("");
          setActive(false);
          setActiveshop(false);
          setPathWayback("");
          setPathSetting("");
      }
    };

    updatePaths();
  }, [pathname]);

  return (
    <div className="HeaderSetting">
      <Link to={pathWayback} style={{ color: "white" }}>
        <ChevronLeft />
      </Link>

      <div>{namepath}</div>
      <div>
        <Link to={pathSetting} style={{ color: "white" }}>
          {active && <Settings />}
          {activeshop && <ShoppingCart />}
        </Link>
      </div>
    </div>
  );
};

export default Header;
