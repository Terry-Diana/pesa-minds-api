import { Request, Response, NextFunction } from "express";

// Mock CAPTCHA middleware to always pass for testing
export const mockCaptcha = (req: Request, res: Response, next: NextFunction) => {
  req.body.answer = "mockAnswer"; // Mock answer to simulate user input
  req.body.hash = "mockHash"; // Mock hash to simulate CAPTCHA hash
  next();
};
