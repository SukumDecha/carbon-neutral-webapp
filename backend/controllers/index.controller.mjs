import { Router } from "express";

import authRouter from "./auth.controller.mjs";
import userRouter from "./user.controller.mjs";
import campaignRouter from "./campaign.controller.mjs";
import blogRouter from "./blog.controller.mjs";
import productRouter from "./product.controller.mjs";
import commentRouter from "./comment.controller.mjs";
import { isAuthenticated } from "./middlewares/middleware.mjs";

const router = Router();

router.use(authRouter);
router.use(userRouter);
router.use(campaignRouter);
router.use(blogRouter);
router.use(productRouter);

router.use(isAuthenticated, commentRouter);

export default router;
