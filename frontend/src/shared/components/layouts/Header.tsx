import { CircleUserRound } from "lucide-react";

const Header = () => {
  return (
    <div className="header">
      <div className="-icon">
        <CircleUserRound />
      </div>
      <div className="-point-label">{0} POINT</div>
    </div>
  );
};

export default Header;
