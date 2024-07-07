import { executeQuery } from "../utils/helpers.mjs";

export const createComment = async (comment, userId) => {
  const { blog_id, content } = comment;

  if (!blog_id || !content || !userId) {
    throw new Error("All fields are required");
  }

  const query =
    "INSERT INTO comments (blog_id, content, user_id) VALUES (?, ?, ?)";
  const params = [blog_id, content, userId];

  await executeQuery(query, params);
};

export const findCommentsByBlogId = async (blogId) => {
  const query = "SELECT * FROM comments WHERE blog_id = ?";
  const params = [blogId];

  return await executeQuery(query, params, false);
};

export const updateComment = async (id, comment) => {
  const { content } = comment;

  if (!content) {
    throw new Error("Content is required");
  }

  const query = "UPDATE comments SET content = ? WHERE id = ?";
  const params = [content, id];

  await executeQuery(query, params);
};

export const deleteComment = async (id) => {
  const query = "DELETE FROM comments WHERE id = ?";
  const params = [id];

  await executeQuery(query, params);
};

