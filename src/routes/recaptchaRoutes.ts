// routes/recaptchaRoutes.ts

import express from "express";
import { verifyCaptcha, generateCaptcha } from "../config/captcha";

const router = express.Router();

// POST route for CAPTCHA verification
router.post("/verify", verifyCaptcha);

// GET route for CAPTCHA challenge
router.get("/challenge", (req, res) => {
  const captcha = generateCaptcha(); // Generate new CAPTCHA
  res.status(200).json(captcha); // Send the CAPTCHA data as a response
});

export default router;
