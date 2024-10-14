import { Request, Response, NextFunction } from "express";
import { generatecaptchaChallenge, verifycaptcha } from '../config/captcha';

export const captchaMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const captchaToken = req.body.captchaToken;
  if (!captchaToken) {
    return res.status(400).json({ message: "CAPTCHA is required" });
  }

  const isCaptchaValid = await verifycaptcha(req, res);
  if (!isCaptchaValid) {
    return res.status(400).json({ message: "Invalid CAPTCHA" });
  }

  next();
};
