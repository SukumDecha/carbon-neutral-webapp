import { ChevronLeft } from "lucide-react";

import { Settings } from "lucide-react";
import { Link } from "react-router-dom";

const settingLink = [
  {
    title: "Personal information",
    link: "/",
  },
  {
    title: "Login & Security ",
    link: "/",
  },
  {
    title: "Statistic",
    link: "/",
  },
  {
    title: "Purchase History",
    link: "/",
  },
  {
    title: "Contact Customer Support",
    link: "/",
  },
  {
    title: "Logout",
    link: "/",
  },
];
export const UserProfile = () => {
  return (
    <div className="profileScreen">
      <div className="headerpro">
        <div className="-navpro">
          <Link to="/">
            <ChevronLeft size={28} />
          </Link>
          <p>User Profile</p>
          <Settings size={28} />
        </div>
        <img src="user.png" alt="" />
      </div>
      <div className="point">
        <p className="numpoint">400,000</p>
        <p>point</p>
      </div>
      <div className="setting">
        {settingLink.map((Links, idx) => (
          <div className="-each-setting" key={idx}>
            <Link to={Links.link}>
              <p>{Links.title} </p>

              <hr />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
