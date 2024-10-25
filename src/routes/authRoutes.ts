import express from "express";
import { signup, login } from "../controllers/authController";
import { captchaMiddleware } from "../middlewares/captchaMiddleware"; // Updated middleware
import { rateLimitMiddleware } from "../middlewares/rateLimitMiddleware";

const router = express.Router();

router.post("/signup", captchaMiddleware, signup); // Uses the updated middleware
router.post("/login", rateLimitMiddleware, captchaMiddleware, login); // Uses the updated middleware

export default router;
