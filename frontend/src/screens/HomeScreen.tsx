import { CarFront } from "lucide-react";
import { Store } from "lucide-react";
import { CalendarCheck } from "lucide-react";
import { Trees } from "lucide-react";
import { Fish } from "lucide-react";
import { Utensils } from "lucide-react";

const linkTo = [
  {
    title: "Car",
    path: "/tracker",
    img: <CarFront size={32} />,
  },
  {
    title: "Exchange",
    path: "/exchange",
    img: <Store size={32} />,
  },
  {
    title: "Event",
    path: "/event",
    img: <CalendarCheck size={32} />,
  },
  {
    title: "Tree",
    path: "/donation/tree",
    img: <Trees size={32} />,
  },
  {
    title: "Coral",
    path: "/donation/coral",
    img: <Fish size={32} />,
  },
  {
    title: "Food",
    path: "/donation/transportation",
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
        <div className="Featured"></div>
      </div>
    </div>
  );
};
export default HomeScreen;
