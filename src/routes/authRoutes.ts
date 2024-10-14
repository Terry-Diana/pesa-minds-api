import express from "express";
import { signup, login } from "../controllers/authController";
import { captchaMiddleware } from "../middlewares/captchaMiddleware";
import { rateLimitMiddleware } from "../middlewares/rateLimitMiddleware";

const router = express.Router();

router.post("/signup", captchaMiddleware, signup);
router.post("/login", rateLimitMiddleware, login);

export default router;
