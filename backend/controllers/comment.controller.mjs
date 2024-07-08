import { Router } from "express";
import {
  createComment,
  deleteComment,
  findCommentsByBlogId,
  updateComment,
} from "../services/comment.service.mjs";
import { handleErrors } from "../utils/helpers.mjs";

const router = Router();

router.get("/api/comments", async (req, res) => {
  const { blogId } = req.query;
  try {
    const comments = await findCommentsByBlogId(blogId);
    return res.json(comments);
  } catch (error) {
    handleErrors(error, res, "Error fetching comments");
  }
});

router.post("/api/comments", async (req, res) => {
  const userId = req.user.id;

  try {
    await createComment(req.body, userId);
    return res.status(201).json({ message: "Comment created" });
  } catch (error) {
    handleErrors(error, res, "Error creating comment");
  }
});

router.patch("/api/comments/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await updateComment(id, req.body);
    return res.status(200).json({ message: "Comment updated" });
  } catch (error) {
    handleErrors(error, res, "Error updating comment");
  }
});

router.delete("/api/comments/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await deleteComment(id);
    return res.status(200).json({ message: "Comment removed" });
  } catch (error) {
    handleErrors(error, res, "Error removing comment");
  }
});

export default router;
