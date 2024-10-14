import { Request, Response, NextFunction } from "express";

export const authenticateUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Add user authentication logic here
  const userId = req.headers["x-user-id"];
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  req.user = { id: userId.toString() };
  console.log("Authenticated user:", req.user); 
  next();
};
