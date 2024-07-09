import { IAddBlog, IBlog, IBlogComment, IUpdateBlog } from "./blog.type";

export const findAllBlogs = async () => {
  const res = await fetch("http://localhost:3000/api/blogs", {
    method: "GET",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch blog list");
  }

  return (await res.json()) as IBlog[];
};

export const findBlogById = async (blogId: string) => {
  const res = await fetch(`http://localhost:3000/api/blogs/${blogId}`, {
    method: "GET",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch blog");
  }

  return (await res.json()) as IBlog;
};

export const createBlog = async (data: IAddBlog) => {
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("content", data.content);
  formData.append("image", data.image.fileList[0].originFileObj);

  const res = await fetch(`http://localhost:3000/api/blogs`, {
    method: "POST",
    body: formData,
    credentials: "include",
  });

  return { success: res.ok };
};

export const updateBlog = async (id: number, data: IUpdateBlog) => {
  const formData = new FormData();
  if (data.title) formData.append("title", data.title);
  if (data.content) formData.append("content", data.content);
  if (data.view_count)
    formData.append("view_count", data.view_count.toString());
  if (data.liked_count)
    formData.append("liked_count", data.liked_count.toString());
  if (data.image)
    formData.append("image", data.image.fileList[0].originFileObj);

  const res = await fetch(`http://localhost:3000/api/blogs/${id}`, {
    method: "PATCH",
    body: formData,
    credentials: "include",
  });

  return { success: res.ok };
};

export const deleteBlog = async (id: number) => {
  const res = await fetch(`http://localhost:3000/api/blogs/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
  
  return { success: res.ok };
};

export const comment = async (blogId: number, data: IBlogComment) => {
  const formData = new FormData();
  formData.append("blog_id", blogId.toString());
  formData.append("content", data.content);

  const res = await fetch(
    `http://localhost:3000/api/blogs/${blogId}/comments`,
    {
      method: "POST",
      body: formData,
      credentials: "include",
    }
  );

  return { success: res.ok };
};

export const updateComment = async (commentId: number, data: IBlogComment) => {
  const formData = new FormData();
  if (data.content) formData.append("content", data.content);

  const res = await fetch(`http://localhost:3000/api/comments/${commentId}`, {
    method: "PATCH",
    body: formData,
    credentials: "include",
  });

  return { success: res.ok };
};

export const deleteComment = async (commentId: number) => {
  const res = await fetch(`http://localhost:3000/api/comments/${commentId}`, {
    method: "DELETE",
    credentials: "include",
  });

  return { success: res.ok };
};
