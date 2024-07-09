import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  findAllBlogs,
  findBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
  comment,
  updateComment,
  deleteComment,
} from "../api";
import { IBlogComment, IUpdateBlog } from "../blog.type";

export const useBlogs = () => {
  return useQuery({
    queryKey: ["blogs"],
    queryFn: findAllBlogs,
    staleTime: 1000 * 60 * 5,
  });
};

export const useBlogById = (blogId: string) => {
  return useQuery({
    queryKey: ["blog", blogId],
    queryFn: () => findBlogById(blogId),
    staleTime: 1000 * 60 * 5,
  });
};

export const useCreateBlog = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createBlog,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });
};

export const useUpdateBlog = (id: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: IUpdateBlog) => updateBlog(id, data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });
};

export const useDeleteBlog = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteBlog,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });
};

export const useComment = (blogId: number) => {
  return useQuery({
    queryKey: ["blogs", "comments"],
    queryFn: async () => {
      const res = await fetch(
        "http://localhost:3000/api/comments?blogId=" + blogId,
        {
          credentials: "include",
        }
      );
      return (await res.json()) as IBlogComment[];
    },
    staleTime: 1000 * 60 * 5,
  });
};

export const useCreate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ blogId, data }: { blogId: number; data: IBlogComment }) =>
      comment(blogId, data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["blogs", "comments"] });
      toast.success("Comment added successfully");
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.message);
    },
  });
};

export const useUpdateComment = (commentId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: IBlogComment) => updateComment(commentId, data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["blogs", "comments"] });
    },
  });
};

export const useDeleteComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteComment,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["blogs", "comments"] });
    },
  });
};
