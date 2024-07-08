import { CSSProperties } from "react";
import useUser from "../hooks/useUser";

const UserProfile = () => {
  const style: CSSProperties = {
    display: "flex",
    flexDirection: "column",
  };

  const user = useUser();

  if (!user) {
    return <div>User not found</div>;
  }
  return (
    <div style={style}>
      UserProfile
      <p>UserName: {user.username}</p>
      <img src={user.avatar} />
    </div>
  );
};

export default UserProfile;
