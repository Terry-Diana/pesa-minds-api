// src/controllers/budgetController.ts
import { Request, Response } from "express";
import { createBudget, listBudgets } from "../services/budgetService";

export const addBudget = async (req: Request, res: Response) => {
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({ message: "User not authenticated" });
  }

  const { name, amount, start_date, end_date } = req.body;
  try {
    const budget = await createBudget({
      user_id: userId, // Use userId from req.user
      name,
      amount,
      start_date,
      end_date,
    });
    res.status(201).json(budget);
  } catch (error) {
    res.status(400).json({ message: "Failed to add budget", error });
  }
};

export const getBudgets = async (req: Request, res: Response) => {
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({ message: "User not authenticated" });
  }

  try {
    const budgets = await listBudgets(userId);
    res.status(200).json(budgets);
  } catch (error) {
    res.status(400).json({ message: "Failed to retrieve budgets", error });
  }
};
