import { useEffect, useState } from "react";
import { IUser } from "../user.type";
import Cookies from "js-cookie";

const useUser = () => {
  const accessToken = Cookies.get("accessToken");
  const [user, setUser] = useState<IUser | undefined>(undefined);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (!accessToken) {
          setUser(undefined);
          return;
        }

        const res = await fetch(`http://localhost:3000/api/auth/status`, {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await res.json();
        console.log(data);
        setUser(data as IUser);
      } catch (error) {
        setUser(undefined);
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [accessToken]);

  return user;
};

export default useUser;
