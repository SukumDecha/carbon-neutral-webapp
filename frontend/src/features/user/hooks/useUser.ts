import { useQuery } from "@tanstack/react-query";
import { IUser } from "../user.type";


export const fetchUser = async () => {
  // const accessToken = Cookies.get("accessToken");

  const res = await fetch("http://localhost:3000/api/auth/status", {
    method: "GET",
    credentials: "include"
  });

  if (!res.ok) {
    throw new Error("Failed to fetch user data");
  }

  return (await res.json()) as IUser;
};

export const useUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
    staleTime: 1000 * 60 * 5,
  });
};
