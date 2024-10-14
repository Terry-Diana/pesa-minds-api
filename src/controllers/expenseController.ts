import { Request, Response } from "express";
import { addExpense, listExpenses } from "../services/expenseService";

export const createExpense = async (req: Request, res: Response) => {
  const { category, amount, date, description } = req.body;
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({ message: "User not authenticated" });
  }

  try {
    const expense = await addExpense({
      user_id: userId, // Use userId from req.user
      category,
      amount,
      date,
      description,
    });
    res.status(201).json(expense);
  } catch (error) {
    res.status(400).json({ message: "Failed to add expense", error });
  }
};

export const getExpenses = async (req: Request, res: Response) => {
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({ message: "User not authenticated" });
  }

  try {
    const expenses = await listExpenses(userId);
    res.status(200).json(expenses);
  } catch (error) {
    res.status(400).json({ message: "Failed to retrieve expenses", error });
  }
};
