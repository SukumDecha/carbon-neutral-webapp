import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  findAllProducts,
  findProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../api";
import { IUpdateProduct } from "../product.type";

export const useProduct = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: findAllProducts,
    staleTime: 1000 * 60 * 5,
  });
};

export const useProductById = (productId: string) => {
  return useQuery({
    queryKey: ["products", productId],
    queryFn: () => findProductById(productId),
    staleTime: 1000 * 60 * 5,
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createProduct,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

export const useUpdateProduct = (id: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: IUpdateProduct) => updateProduct(id, data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};
