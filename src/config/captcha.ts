import { Request, Response } from "express";
import crypto from "crypto";

export const generatecaptchaChallenge = (req: Request, res: Response) => {
  const num1 = Math.floor(Math.random() * 10);
  const num2 = Math.floor(Math.random() * 10);
  const question = `${num1} + ${num2}`;
  const expectedAnswer = num1 + num2;

  const hash = crypto
    .createHash("sha256")
    .update(expectedAnswer.toString())
    .digest("hex");

  res.json({ question, hash });
};

// Updated verifycaptcha function
export const verifycaptcha = (req: Request, res: Response): boolean => {
  const { answer, hash } = req.body;

  const answerHash = crypto
    .createHash("sha256")
    .update(answer.toString())
    .digest("hex");

  if (answerHash === hash) {
    return true; // Indicate CAPTCHA is valid
  }

  return false; // Indicate CAPTCHA is invalid
};
