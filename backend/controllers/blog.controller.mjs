import { Router } from "express";
import {
  findBlogs,
  findBlogById,
  createBlog,
  removeBlog,
} from "../services/blog.service.mjs";
import { handleErrors } from "../utils/helpers.mjs";

const router = Router();

router.get("/api/blogs", async (_req, res) => {
  try {
    const blogs = await findBlogs();
    return res.status(200).json(blogs);
  } catch (error) {
    return handleErrors(res, error, "Failed to fetch blogs");
  }
});

router.get("/api/blogs/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const blog = await findBlogById(id);
    return res.status(200).json(blog);
  } catch (error) {
    return handleErrors(res, error, "Failed to fetch blog");
  }
});

router.post("/api/blogs", async (req, res) => {
  const blog = req.body;
  blog.admin_id = req.user.id;

  try {
    await createBlog(blog);
    return res.status(201).json({ message: "Blog created" });
  } catch (error) {
    return handleErrors(res, error, "Failed to create blog");
  }
});

router.patch("/api/blogs/:id", async (req, res) => {
  const { id } = req.params;
  const blog = req.body;

  try {
    await editBlog(id, blog);
    return res.status(200).json({ message: "Blog updated" });
  } catch (error) {
    return handleErrors(res, error, "Failed to update blog");
  }
});

router.delete("/api/blogs:/id", async (req, res) => {
  const { id } = req.params;
  
  try {
    await removeBlog(id);
    return res.status(200).json({ message: "Blog removed" });
  } catch (error) {
    return handleErrors(res, error, "Failed to remove blog");
  }
});

export default router;
