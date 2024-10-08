import { Request, Response } from 'express';
import crypto from 'crypto';

// Generate a random math CAPTCHA challenge and return a hash of the answer
export const generateRecaptchaChallenge = (req: Request, res: Response) => {
  const num1 = Math.floor(Math.random() * 10);
  const num2 = Math.floor(Math.random() * 10);
  const question = `${num1} + ${num2}`;
  const expectedAnswer = num1 + num2;

  // Hash the expected answer to avoid exposing it directly
  const hash = crypto.createHash('sha256').update(expectedAnswer.toString()).digest('hex');

  // Return the challenge question and the hashed answer
  res.json({ question, hash });
};

// Verify the user's response to the CAPTCHA
export const verifyRecaptcha = (req: Request, res: Response) => {
  const { answer, hash } = req.body;

  // Hash the user's answer
  const answerHash = crypto.createHash('sha256').update(answer.toString()).digest('hex');

  // Compare the user's answer hash with the original hash
  if (answerHash === hash) {
    return res.json({ success: true });  // CAPTCHA passed
  }

  return res.json({ success: false });   // CAPTCHA failed
};
