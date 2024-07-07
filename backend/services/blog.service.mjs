import { executeQuery } from "../utils/helpers.mjs";

export const createBlog = async (blog) => {
  const { title, content, image, admin_id, view_count, liked_count } = blog;

  if (!title || !content || !thumbnail || !admin_id) {
    throw new Error("Title, content, thumbnail, and admin_id are required");
  }

  const thumbnail = await saveFile(image);

  const query =
    "INSERT INTO blogs (title, content, thumbnail, admin_id, view_count, liked_count) VALUES (?, ?, ?, ?, ?, ?)";

  const params = [title, content, thumbnail, admin_id, view_count, liked_count];
  await executeQuery(query, params);
};

export const editBlog = async (id, blog) => {
  const { title, content, image } = blog;

  const fieldsToUpdate = {
    ...(title && { title }),
    ...(content && { content }),
  };

  if (Object.keys(fieldsToUpdate).length === 0) {
    throw new Error("No fields provided for update");
  }

  if (image) {
    const currentBlog = await findBlogById(id);
    removeDirFromFile(currentBlog.thumbnail);

    fieldsToUpdate.thumbnail = await saveFile(image);
  }

  const setClause = Object.keys(fieldsToUpdate)
    .map((field) => `${field} = ?`)
    .join(", ");

  const query = `UPDATE blogs SET ${setClause} WHERE id = ?`;
  const params = [...Object.values(fieldsToUpdate), id];

  await executeQuery(query, params);
};

export const removeBlog = async (id) => {
  const query = "DELETE FROM blogs WHERE id = ?";
  const params = [id];

  await executeQuery(query, params);
};

export const findBlogById = async (id) => {
  const query = "SELECT * FROM blogs WHERE id = ?";
  const params = [id];

  return await executeQuery(query, params);
};

export const findBlogs = async () => {
  const query = "SELECT * FROM blogs";
  const [results] = await executeQuery(query, [], false);

  return results;
};
