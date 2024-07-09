import { useQuery } from "@tanstack/react-query";
import { IClaimHistory, IUser } from "../user.type";

const fetchUser = async () => {
  const res = await fetch("http://localhost:3000/api/auth/status", {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch user data");
  }

  return (await res.json()) as IUser;
};

const getClaimHistory = async () => {
  const res = await fetch("http://localhost:3000/api/claimHistory", {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch claim history");
  }

  return (await res.json()) as IClaimHistory[];
};

const getDonationHistory = async () => {
  const res = await fetch("http://localhost:3000/api/donationHistory", {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch claim history");
  }

  return (await res.json()) as IClaimHistory[];
};

export const useUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
    staleTime: 1000 * 60 * 5,
  });
};

export const useClaimHistory = () => {
  return useQuery({
    queryKey: ["claimHistory"],
    queryFn: getClaimHistory,
    staleTime: 1000 * 60 * 5,
  });
};

export const useDonationHistory = () => {
  return useQuery({
    queryKey: ["donateHistory"],
    queryFn: getDonationHistory,
    staleTime: 1000 * 60 * 5,
  });
};
