import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createCampaign,
  deleteCampaign,
  donateToCampaign,
  findAllCampaigns,
  findCampaignByName,
  findTopDonors,
  updateCampaign,
} from "../api";

export const useCampaigns = () => {
  return useQuery({
    queryKey: ["campaigns"],
    queryFn: findAllCampaigns,
    staleTime: 1000 * 60 * 5,
  });
};

export const useCampaignByName = (productId: string) => {
  return useQuery({
    queryKey: ["campaigns", productId],
    queryFn: () => findCampaignByName(productId),
    staleTime: 1000 * 60 * 5,
  });
};

export const useTopDonors = (campaignTitle: string) => {
  return useQuery({
    queryKey: ["campaigns", "topDonors"],
    queryFn: () => findTopDonors(campaignTitle),
    staleTime: 1000 * 60 * 5,
  });
};

export const useCreateCampaign = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCampaign,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["campaigns"] });
    },
  });
};

export const useUpdateCampaign = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateCampaign,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["campaigns"] });
    },
  });
};

export const useDeleteCampaign = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCampaign,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["campaigns"] });
    },
  });
};

export const useDonate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      campaignTitle: string;
      amount: number;
      userId: number;
    }) => donateToCampaign(data.campaignTitle, data.amount, data.userId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["campaigns"] });
    },
  });
};
