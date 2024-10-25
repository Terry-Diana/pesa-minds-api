// config/captcha.ts

import { Request, Response } from "express";
import crypto from "crypto";

// Function to generate a new CAPTCHA challenge
export const generateCaptcha = () => {
  const num1 = Math.floor(Math.random() * 10);
  const num2 = Math.floor(Math.random() * 10);
  const question = `${num1} + ${num2}`;
  const answer = num1 + num2;

  const hash = crypto
    .createHash("sha256")
    .update(answer.toString())
    .digest("hex");

  return { question, hash };
};

export const verifyCaptcha = (req: Request, res: Response) => {
  const { answer, hash } = req.body;

  if (!answer || !hash) {
    return res.status(400).json({ message: "CAPTCHA answer and hash are required." });
  }

  const answerHash = crypto
    .createHash("sha256")
    .update(answer.toString())
    .digest("hex");

  if (answerHash === hash) {
    // CAPTCHA verification succeeded
    return res
      .status(200)
      .json({ success: true, message: "CAPTCHA verified successfully." });
  }

  // CAPTCHA verification failed, generate a new CAPTCHA challenge
  const newCaptcha = generateCaptcha();

  // Return a 400 response with a new CAPTCHA challenge
  return res.status(400).json({
    message: "CAPTCHA verification failed. Please try again.",
    captcha: newCaptcha,
  });
};
