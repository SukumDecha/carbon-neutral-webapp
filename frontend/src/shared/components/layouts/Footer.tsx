import {
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
  const location = useLocation();

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
