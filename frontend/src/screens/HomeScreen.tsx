const linkTo = [
  {
    title: "Car",
    path: "/tracker",
    img: "/assets/home/car.png",
  },
  {
    title: "Exchange",
    path: "/exchange",
    img: "/assets/home/event_upcoming.png",
  },
  {
    title: "Event",
    path: "/event",
    img: "/assets/home/shopping_bag.png",
  },
];

const donateLink = [
  {
    title: "Tree",
    path: "/donation/tree",
    img: "/assets/home/car.png",
  },
  {
    title: "Coral",
    path: "/donation/coral",
    img: "/assets/home/event_upcoming.png",
  },
  {
    title: "Transportation",
    path: "/donation/transportation",
    img: "/assets/home/shopping_bag.png",
  },
];

const HomeScreen = () => {
  return (
    <div>
      <div className="intro">
        <p className="introtext">
          Calculate your emissions, reduce your carbon footprint and support
          climate protection!
        </p>
      </div>
      <div className="pathTo">
        {linkTo.map((LINK, idx) => (
          <a href={LINK.path} key={idx}>
            <img src={LINK.img} alt={LINK.title} />
            {LINK.title}
          </a>
        ))}
      </div>
      <p className="donate">Donation</p>
      <div className="boxes">
        <div className="donateLogo">
          {donateLink.map((LINK, idx) => (
            <a href={LINK.path} key={idx}>
              <img src={LINK.img} alt={LINK.title} />
              {LINK.title}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
export default HomeScreen;
