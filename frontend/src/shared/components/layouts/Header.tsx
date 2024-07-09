import { CircleUserRound } from "lucide-react";
import { ChevronLeft } from "lucide-react";
import { Settings } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <Link to="/profile" className="-icon">
        <CircleUserRound />
      </Link>
      <div className="-point-label">{0} POINT</div>
    </div>
  );
};

export const HeaderSetting = () => {
  const { pathname } = useLocation();
  const [active, setActive] = useState(true);
  const [namepath, setNamepath] = useState("");

  useEffect(() => {
    if (pathname === "/personal") {
      setNamepath("Personal information");
      setActive(true);
    } else if (pathname === "/cart") {
      setNamepath("Cart");
      setActive(false);
    } else if (pathname === "/history") {
      setNamepath("Purchase History");
    }
  }, [pathname]);

  return (
    <div className="HeaderSetting">
      <Link to="/">
        <ChevronLeft />
      </Link>
      <div>{namepath}</div>
      <div>{active && <Settings />}</div>
    </div>
  );
};

export default Header;
