// src/controllers/authController.ts
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { createUser, loginUser } from "../services/authService";

interface CustomError extends Error {
    details?: any;
}

export const signup = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
      const user = await createUser(email, password);
      res.status(201).json({ user }); 
  } catch (error) {
      const customError = error as CustomError;
      res.status(400).json({
          message: customError.message,
          details: customError.details || null,
      });
  }
};

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const user = await loginUser(email, password);
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Generate JWT
        const token = jwt.sign({ id: user.user.id, email: user.user.email }, process.env.JWT_SECRET as string, {
            expiresIn: "1h",
        });

        res.status(200).json({ user, token });
    } catch (error) {
        const customError = error as CustomError; 
        res.status(400).json({
            message: customError.message,
            details: customError.details || null, 
        });
    }
};
