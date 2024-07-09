import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  IClaimHistory,
  IDonateHistory,
  IUpdateUser,
  IUser,
} from "../user.type";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

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

const editUser = async (editUser: IUpdateUser) => {
  const formData = new FormData();
  if (editUser.avatar) {
    formData.append("image", editUser.avatar.fileList[0].originFileObj);
  }
  if (editUser.username) {
    formData.append("username", editUser.username);
  }
  if (editUser.email) {
    formData.append("email", editUser.email);
  }
  if (editUser.password) {
    formData.append("password", editUser.password);
  }

  const res = await fetch("http://localhost:3000/api/users", {
    method: "PATCH",
    credentials: "include",
    body: formData,
  });

  if (!res.ok) {
    throw new Error("Failed to edit user data");
  }

  const { accessToken } = await res.json();

  Cookies.remove("accessToken");

  Cookies.set("accessToken", accessToken, {
    domain: "localhost",
    path: "/",
    secure: false,
    sameSite: "strict",
  });

  toast.success("Cookies has been updated");

  return accessToken;
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

  const data = await res.json();

  const convertedData: IDonateHistory[] = data.map((item: IDonateHistory) => {
    return {
      ...item,
      total: Number(item.total),
    };
  });

  return convertedData;
};

export const useUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
    staleTime: 1000 * 60 * 5,
  });
};

export const useEditUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["user"],
    mutationFn: editUser,
    onSuccess: async () => {
      console.log("Success");
      await queryClient.invalidateQueries({ queryKey: ["user"] });
    },
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
