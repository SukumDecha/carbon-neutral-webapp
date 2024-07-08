import {
  CirclePlus,
  CircleUserRound,
  HandHeart,
  House,
  MessageSquareMore,
  ShoppingCart,
} from "lucide-react";
import { ReactNode } from "react";
import { useLocation } from "react-router-dom";

interface INavigation {
  title: string;
  href: string;
  icon: ReactNode;
}

const navigation: INavigation[] = [
  {
    title: "Home",
    href: "/",
    icon: <House />,
  },
  {
    title: "Cart",
    href: "/cart",
    icon: <ShoppingCart />,
  },
  {
    title: "Donation",
    href: "/donation",
    icon: <HandHeart />,
  },
  {
    title: "Blog",
    href: "/blog",
    icon: <MessageSquareMore />,
  },
  {
    title: "User Settings",
    href: "/settings",
    icon: <CircleUserRound />,
  },
];

const Footer = () => {
  const { pathname } = useLocation();

  if (pathname.startsWith("/product"))
    return (
      <div className="footer-shop">
        <div className="-wrap">
          <div className="-col">
            <CirclePlus />
            <p>Add to Basket</p>
          </div>
        </div>

        <div className="-wrap">
          <div className="-col">
            <ShoppingCart />
            <p>Exchange</p>
          </div>
        </div>
      </div>
    );
  return (
    <div className="footer">
      {navigation.map((item) => {
        return (
          <a
            key={item.title}
            href={item.href}
            className={`-icon ${
              location.pathname === item.href ? "active" : ""
            }`}
          >
            {item.icon}
          </a>
        );
      })}
    </div>
  );
};

export default Footer;
