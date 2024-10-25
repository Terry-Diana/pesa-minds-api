// src/middlewares/captchaMiddleware.ts

import { Request, Response, NextFunction } from "express";
import crypto from "crypto";

export const captchaMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { answer, hash } = req.body;

  if (!answer || !hash) {
    return res.status(400).json({ message: "CAPTCHA is required" });
  }

  const answerHash = crypto
    .createHash("sha256")
    .update(answer.toString())
    .digest("hex");

  if (answerHash === hash) {
    // CAPTCHA verification succeeded, proceed to the next middleware
    return next();
  }

  // CAPTCHA verification failed, send a 400 response
  return res.status(400).json({ message: "CAPTCHA verification failed" });
};
