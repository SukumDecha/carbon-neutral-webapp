import { ChevronLeft, ChevronRight } from "lucide-react";

import { Settings } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { getImagePath } from "../../../shared/utils/helper.utils";
import { useUser } from "../hooks/useUser";
import Loading from "../../../shared/components/Loading";
import EmptyBox from "../../../shared/components/EmptyBox";
import Button from "../../../shared/components/Button";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

const settingLink = [
  {
    title: "Personal information",
    link: "/profile/edit",
  },
  {
    title: "Login & Security ",
    link: "/",
  },
  {
    title: "Statistic",
    link: "/profile/statistic",
  },
  {
    title: "Purchase History",
    link: "/profile/history",
  },
  {
    title: "Contact Customer Support",
    link: "/",
  },
];
export const UserProfile = () => {
  const { data: user, isLoading } = useUser();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const res = await fetch("http://localhost:3000/api/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const { error } = await res.json();
      console.log(error);
      return;
    }

    Cookies.remove("accessToken");
    navigate("/auth/login");
    toast.success("Logout successful");
  };

  if (isLoading) return <Loading />;

  if (!user)
    return (
      <EmptyBox>
        <p>Please login before access this page</p>
      </EmptyBox>
    );

  const imgPath = user.avatar
    ? getImagePath(user.avatar)
    : "../../../../public/default-avatar.jpg";

  return (
    <div className="profileScreen">
      <div className="-header">
        <Link to="/">
          <ChevronLeft size={28} />
        </Link>
        <p>User Profile</p>
        <Settings size={28} />
      </div>

      <div className="-avatar">
        <img src={imgPath} alt="" />
      </div>

      <div className="-point">
        <p className="numpoint">{user.points || 0}</p>
        <p>total points</p>
      </div>

      <div className="-setting">
        {settingLink.map((Links, idx) => (
          <div className="-each-setting" key={idx}>
            <Link to={Links.link}>
              <div className="-wrap">
                <p>{Links.title} </p>
                <ChevronRight />
              </div>

              <hr />
            </Link>
          </div>
        ))}

        <Button type="secondary" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </div>
  );
};
