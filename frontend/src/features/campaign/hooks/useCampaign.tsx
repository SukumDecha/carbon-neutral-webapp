import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createCampaign,
  deleteCampaign,
  findAllCampaigns,
  findCampaignById,
  updateCampaign,
} from "../api";

export const useCampaigns = () => {
  return useQuery({
    queryKey: ["campaigns"],
    queryFn: findAllCampaigns,
    staleTime: 1000 * 60 * 5,
  });
};

export const useCampaignById = (productId: string) => {
  return useQuery({
    queryKey: ["campaigns", productId],
    queryFn: () => findCampaignById(productId),
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
