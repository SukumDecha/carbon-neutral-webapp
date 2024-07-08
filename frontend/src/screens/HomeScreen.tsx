import { useState } from "react";
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

const boss = [
  {
    title: "earth",
    img: "/homegameplay/earth.jpg",
  },
  {
    title: "sun",
    img: "/homegameplay/sun.jpg",
  },
  {
    title: "venus",
    img: "/homegameplay/venus.jpeg",
  }
]



const HomeScreen = () => {
  const [health, setHealth] = useState(5);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleEarthClick = () => {
    if (health > 0) {
      setHealth(health - 1); 
    }
    if (health === 1) {
      const newIndex = (currentImageIndex + 1) % boss.length;
      setCurrentImageIndex(newIndex);
      setHealth(5);
    }
  };




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
          <div className="animated-earth" onClick={handleEarthClick}>
          <img
              src={boss[currentImageIndex].img}
              alt={boss[currentImageIndex].title}
              className="rotate"
            />
            <p>health :{health}</p>
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
